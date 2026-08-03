// Build-time repo fetch. Runs via predev/prebuild so the token (if present)
// never ships to the browser — only the resulting JSON does.
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

const USERNAME = "iuixd";
const OUT_PATH = path.resolve("src/data/repos.json");
const token = process.env.GITHUB_TOKEN;

const headers = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
};
if (token) headers.Authorization = `Bearer ${token}`;

// Authenticated: list all repos the token's owner has, including private.
// Unauthenticated fallback: public repos only (same as the old runtime fetch).
const url = token
  ? "https://api.github.com/user/repos?affiliation=owner&sort=updated&per_page=100"
  : `https://api.github.com/users/${USERNAME}/repos?sort=updated&per_page=100`;

async function main() {
  const res = await fetch(url, { headers });
  if (!res.ok) {
    throw new Error(`GitHub API request failed: ${res.status} ${res.statusText}`);
  }
  const data = await res.json();

  const repos = data
    .filter((repo) => !repo.fork)
    .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
    .slice(0, 15)
    .map((repo) => ({
      id: repo.id,
      name: repo.name,
      html_url: repo.html_url,
      description: repo.description,
      language: repo.language,
      stargazers_count: repo.stargazers_count,
      license: repo.license ? { name: repo.license.name } : null,
      updated_at: repo.updated_at,
      private: repo.private,
    }));

  await mkdir(path.dirname(OUT_PATH), { recursive: true });
  await writeFile(OUT_PATH, JSON.stringify(repos, null, 2) + "\n");
  console.log(
    `[fetch-repos] wrote ${repos.length} repos to ${path.relative(process.cwd(), OUT_PATH)}` +
      (token ? " (authenticated: includes private)" : " (unauthenticated: public only)")
  );
}

main().catch((err) => {
  console.error("[fetch-repos] failed:", err.message);
  process.exit(1);
});
