import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import myPhoto from "../assets/myPhoto.webp";
// eslint-disable-next-line no-unused-vars
import linkArrw from "../assets/external-link-arrow.svg";
import lovableLogo from "../assets/lovable-logo.svg";
import reactIcon from "../assets/react-icon.svg";
import supabaseLogo from "../assets/supabase-logo.svg";
import chatgptLogo from "../assets/chatgpt-logo.svg";
import typescriptLogo from "../assets/ts-logo.svg";
import cssLogo from "../assets/css-logo.svg";
import figmaLogo from "../assets/figma-logo.svg";
// eslint-disable-next-line no-unused-vars
import githubLogo from "../assets/github-logo.svg";
import tailwindLogo from "../assets/tailwind-logo.svg";
import Consultant from "../assets/Consultant.svg";
import thumbnailLeakShield from "../assets/leakshield-thumbnail.webp";
import thumbnailiuixdCopilot from "../assets/iuixd-copilot-thumbnail.webp";
import thumbnailiuixdDesignConverter from "../assets/iuixd-design-converter-thumbnail.webp";
import Reveal from "./Reveal";
import Footer from "./Footer";
import TimelineProjectCard from "./TimelineProjectCard";

const leakShieldTools = [
  { key: "lovable", name: "Lovable AI", logo: lovableLogo },
  { key: "react", name: "React", logo: reactIcon },
  { key: "tailwind", name: "Tailwind CSS", logo: tailwindLogo },
  { key: "supabase", name: "Supabase", logo: supabaseLogo },
];

const iuixdCopilotTools = [{ key: "chatgpt", name: "ChatGPT", logo: chatgptLogo }];

const iuixdDesignConverterTools = [
  { key: "figma", name: "Figma", logo: figmaLogo },
  { key: "chatgpt", name: "ChatGPT", logo: chatgptLogo },
  { key: "typescript", name: "TypeScript", logo: typescriptLogo },
  { key: "css", name: "CSS", logo: cssLogo },
];

const RecentProjects = () => {
  return (
    <>
      <div
        data-page-name="articles"
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

            <section className="flex h-full max-md:pl-[52px] md:pl-[120px] ">
              <ol className="h-full border-s border-turquoise-500">
                <li className="ml-6 sm:ml-10 md:ml-22 font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
                  <Reveal>
                    Recent <br />
                    <span className="opacity-60">Projects</span>
                  </Reveal>
                </li>
                <li className="mb-16">
                  <Reveal>
                    <div className="flex-start flex flex-wrap items-center gap-y-4 pt-8">
                      <div className="-ms-[7px] me-0 h-[14px] w-[14px] rounded-full bg-turquoise-700/75 border-3 border-turquoise-300/75"></div>
                      <p className="flex mx-6 text-sm text-turquoise-700">
                        2025
                      </p>

                      <TimelineProjectCard
                        href="https://leakshield.lovable.app/"
                        thumbnail={thumbnailLeakShield}
                        thumbnailAlt="Thubmnail to LeakShield - Vibe-Coding App"
                        titleLines={["High-performing UX for a", "Control Center & Field App"]}
                        tools={leakShieldTools}
                        date="Jul 2025"
                        idPrefix="2025"
                      />
                    </div>
                  </Reveal>
                </li>
                <li className="mb-16">
                  <Reveal>
                    <div className="flex-start flex flex-wrap items-center gap-y-4 pt-8">
                      <div className="-ms-[7px] me-0 h-[12px] w-[12px] rounded-full bg-turquoise-700/75 border-3 border-turquoise-300/75"></div>
                      <p className="flex mx-6 text-sm text-turquoise-700">
                        2026
                      </p>

                      <div className="flex flex-col sm:flex-row flex-wrap gap-6">
                        <TimelineProjectCard
                          href="https://chatgpt.com/g/g-6a1d86d7cd6c8191b31aab1208a9f622-iuixd-copilot"
                          thumbnail={thumbnailiuixdCopilot}
                          thumbnailAlt="Thubmnail to iuixd Copilot - UX Research Assistant"
                          titleLines={["iuixd Copilot: UX Research Assistant"]}
                          tools={iuixdCopilotTools}
                          date="May 2026"
                          idPrefix="2026-a"
                        />
                        <TimelineProjectCard
                          href="https://www.figma.com/community/plugin/1654850184639725883"
                          thumbnail={thumbnailiuixdDesignConverter}
                          thumbnailAlt="Thubmnail to iuixd Design Converter - Figma Styles & Variables Converter"
                          titleLines={["Convert designs to Figma Styles & Variables"]}
                          tools={iuixdDesignConverterTools}
                          date="Jun 2026"
                          idPrefix="2026-b"
                        />
                      </div>
                    </div>
                  </Reveal>
                </li>
                <li className="mb-16">
                  <div className="flex-start flex items-center">
                    <div className="-ms-[7px] me-0 h-[12px] w-[12px] rounded-full bg-turquoise-700/30 border-3 border-turquoise-300/30"></div>
                    <p className="flex mx-6 text-sm text-turquoise-700/30">
                      2027
                    </p>
                  </div>
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

export default RecentProjects;
