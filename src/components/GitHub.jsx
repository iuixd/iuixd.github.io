import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import myPhoto from "../assets/myPhoto.webp";
import Footer from "./Footer";
import Reveal from "./Reveal";

const GitHub = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch("https://api.github.com/users/iuixd/repos?sort=updated&per_page=15");
        if (response.ok) {
          const data = await response.json();
          // Filter out forks to keep portfolio clean, taking top 15 most recently updated
          setRepos(data.sort((a,b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()).slice(0, 15));
        }
      } catch (error) {
        console.error("Failed to fetch Github repos", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRepos();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffTime / (1000 * 60));
    
    if (diffHours < 24) {
      if (diffHours > 0) return `Updated ${diffHours} hours ago`;
      if (diffMinutes > 0) return `Updated ${diffMinutes} minutes ago`;
      return `Updated just now`;
    }
    
    return `Updated on ${date.toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' })}`;
  };

  const getLanguageColor = (lang) => {
    const colors = {
      JavaScript: "#f1e05a",
      TypeScript: "#3178c6",
      HTML: "#e34c26",
      CSS: "#563d7c",
      Vue: "#41b883",
      ApacheConf: "#d12127",
      Python: "#3572A5"
    };
    return colors[lang] || "#57606a";
  };

  return (
    <>
      <div
        data-page-name="github"
        x-data="{ pageName: $root.dataset.pageName }"
        x-init="$store.page.name = pageName"
        className="fixed h-[74px] z-2 top-0 self-auto w-full bg-turquoise-500 opacity-0 border-1"
      ></div>

      <div className="relative flex flex-col max-[360px]:items-start min-[360px]:items-center">
        <div className="static flex flex-col self-auto min-[360px]:w-full md:w-full lg:w-[1024px] h-auto text-white">
          <Link
            to="/"
            className="max-md:ml-[50px] md:ml-[90px] lg:ml-[6px] mt-[12px] self-start relative z-101"
          >
            <img src={myPhoto} className="w-12 h-12" alt="Srikumar's Photo" width="48" height="48" />
          </Link>
        </div>
      </div>

      <div className="body-wrapper h-full">
        <div className="subpage-body-container">
          <div className="sub-content-wrapper transition-all duration-300 ease-in-out">
            <div>
              <Link to="/" aria-label="Go back" className="group sub-backhome-link cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="w-5 h-5 fill-turquoise-600 group-hover:fill-turquoise-900"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5"
                  ></path>
                </svg>
              </Link>
            </div>
            
            <section className="flex h-full max-md:pl-[52px] max-md:pr-[20px] md:pl-[120px] pr-4 md:pr-0 pb-16">
              <ol className="h-full w-full">
                <li className="ml-0 md:ml-22 font-extrabold text-5xl md:text-7xl mb-4 md:mb-0 text-white">
                  <Reveal>
                    GitHub <br />
                    <span className="opacity-60">Repos</span>
                  </Reveal>
                </li>
                
                <li className="mx-0 md:mx-22 py-6 md:py-8 font-medium text-base md:text-[18px]">
                  <Reveal>
                    <div className="p-6 md:p-8 bg-white rounded-2xl md:rounded-3xl shadow-md flex flex-col w-full text-[#24292f] font-sans antialiased">
                      
                      {loading ? (
                        <div className="flex items-center justify-center min-h-[400px]">
                          <p className="text-turquoise-800 animate-pulse text-lg">Loading repositories...</p>
                        </div>
                      ) : repos.length > 0 ? (
                        <div className="flex flex-col">
                          {repos.map((repo, index) => (
                            <div key={repo.id} className={`py-4 md:py-5 flex flex-col gap-1.5 ${index !== repos.length - 1 ? 'border-b border-[#d0d7de]' : ''}`}>
                              <div className="flex items-center gap-2 mb-1">
                                <a
                                  href={repo.html_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-[20px] md:text-[22px] font-semibold text-[#0969da] hover:underline hover:text-[#0969da] break-all leading-tight"
                                >
                                  {repo.name}
                                </a>
                                <span className="px-[7px] py-[1px] text-[12px] font-medium border border-[#d0d7de] text-[#57606a] rounded-full inline-flex items-center h-fit">
                                  {repo.private ? "Private" : "Public"}
                                </span>
                              </div>
                              
                              {repo.description && (
                                <p className="text-[14px] text-[#57606a] mb-1.5 pr-4 md:pr-12 leading-snug">
                                  {repo.description}
                                </p>
                              )}
                              
                              <div className="flex flex-wrap items-center text-[12px] text-[#57606a] gap-4 mt-1">
                                {repo.language && (
                                  <span className="flex items-center gap-1.5">
                                    <span 
                                      className="w-[11px] h-[11px] rounded-full border border-white" 
                                      style={{ backgroundColor: getLanguageColor(repo.language) }}
                                    ></span>
                                    {repo.language}
                                  </span>
                                )}
                                
                                {repo.stargazers_count > 0 && (
                                  <a href={`${repo.html_url}/stargazers`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-[#0969da] transition-colors cursor-pointer text-[#57606a]">
                                    <svg aria-label="star" role="img" height="15" viewBox="0 0 16 16" version="1.1" width="15" data-view-component="true" className="fill-[#57606a] hover:fill-[#0969da] transition-colors">
                                        <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Zm0 2.445L6.615 5.5a.75.75 0 0 1-.564.41l-3.097.45 2.24 2.184a.75.75 0 0 1 .216.664l-.528 3.084 2.769-1.456a.75.75 0 0 1 .698 0l2.77 1.456-.53-3.084a.75.75 0 0 1 .216-.664l2.24-2.183-3.096-.45a.75.75 0 0 1-.564-.41L8 2.694Z"></path>
                                    </svg>
                                    {repo.stargazers_count}
                                  </a>
                                )}

                                {repo.license && (
                                  <span className="flex items-center gap-1">
                                    <svg aria-label="license" role="img" height="15" viewBox="0 0 16 16" version="1.1" width="15" data-view-component="true" className="fill-[#57606a]">
                                        <path d="M8.75.75V2h-1.5V.75a.75.75 0 0 1 1.5 0ZM6 2.75A2.75 2.75 0 0 1 8.75 0h-1.5A2.75 2.75 0 0 1 10 2.75v.5h2.25a2.25 2.25 0 0 1 2.25 2.25v2a2.25 2.25 0 0 1-2.25 2.25H10v4.25A2.75 2.75 0 0 1 7.25 16h-1.5A2.75 2.75 0 0 1 3 13.25V9.75H.75A2.75 2.75 0 0 1-2 7.5v-2A2.75 2.75 0 0 1 .75 2.75H3v-.5Zm-3 7L1.5 9.75v-2L3 7.75v2Zm9-2L13.5 7.75v2L12 9.75v-2ZM8.5 4.25h-4v9a1.25 1.25 0 0 0 1.25 1.25h1.5A1.25 1.25 0 0 0 8.5 13.25v-9Z"></path>
                                    </svg>
                                    {repo.license.name || repo.license}
                                  </span>
                                )}

                                <span>{formatDate(repo.updated_at)}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center min-h-[300px] text-[#57606a]">
                          <p>No public repositories found for this user.</p>
                        </div>
                      )}
                      
                    </div>
                  </Reveal>
                </li>
              </ol>
            </section>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default GitHub;
