import React from "react";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import myPhoto from "../assets/myPhoto.png";
import linkArrw from "../assets/external-link-arrow.svg";
import lovableLogo from "../assets/lovable-logo.svg";
import reactIcon from "../assets/react-icon.svg";
import supabaseLogo from "../assets/supabase-logo.svg";
import figmaLogo from "../assets/figma-logo.svg";
import githubLogo from "../assets/github-logo.svg";
import tailwindLogo from "../assets/tailwind-logo.svg";
import thumbnailCBM from "../assets/thumbnailCBM.png";
import Consultant from "../assets/Consultant.svg";
import Reveal from "./Reveal";

const VibeCodingApps = () => {
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
            className="max-[550px]:ml-[50px] sm:ml-[90px] lg:ml-[6px] mt-[12px] self-start relative z-101"
          >
            <img src={myPhoto} className="w-12 h-12" alt="Srikumar's Photo" />
          </Link>
        </div>
      </div>

      <div className="body-wrapper h-full">
        <div className="subpage-body-container">
          <div className="sub-content-wrapper transition-all duration-300 ease-in-out">
            <Link to="/" className="group sub-backhome-link cursor-pointer">
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

            <section className="flex h-full max-[550px]:pl-[52px] sm:pl-[120px] ">
              <ol className="h-full border-s border-turquoise-500">
                <li className="ml-22 font-extrabold text-7xl">
                  <Reveal>
                    Recent <br />
                    <span className="opacity-60">Projects</span>
                  </Reveal>
                </li>
                <li className="mb-16">
                  <Reveal>
                    <div className="flex-start flex items-center pt-8">
                      <div className="-ms-[7px] me-0 h-[14px] w-[14px] rounded-full bg-turquoise-700/75 border-3 border-turquoise-300/75"></div>
                      <p className="flex mx-6 text-sm text-turquoise-700">
                        2025
                      </p>

                      <a
                        href="https://leakshield.lovable.app/"
                        target="_blank"
                        className="relative group flex flex-col w-[350px] h-fit items-center rounded-[24px] overflow-hidden bg-turquoise-600 shadow-turquoise-900/10
                        shadow-l hover:shadow-xl hover:scale-101 transition-all duration-300"
                      >
                        <img
                          className="w-full z-0 group-hover:scale-110 transition-transform duration-300"
                          src="/assets/leakshield-thumbnail.webp"
                          alt="Thubmnail to LeakShield - Vibe-Coding App"
                        />

                        <span
                          className="absolute flex justify-center items-center w-12 h-12 top-[16px] right-[24px] 
                          group-hover:motion-preset-fade-lg 
                          group-hover:-translate-y-4 group-hover:translate-x-6 transition-transform duration-300
                          rounded-full bg-transparent group-hover:bg-violet-300/50"
                        >
                          <img
                            src={linkArrw}
                            className="w-4 h-4 group-hover:w-4 group-hover:h-4"
                            alt="External Link Arrow Icon"
                          />
                        </span>

                        <div className="flex flex-row z-2 justify-between items-center w-full px-4 pt-4 pb-2 text-[11px] text-white/70 bg-turquoise-600">
                          <span className="text-left">August, 2025</span>
                          <div className=" flex flex-row items-center gap-2">
                            <span className="text-right">On </span>
                            <span className="flex flex-row items-center gap-[2px] font-bold text-right">
                              <img
                                className="h-[10px]"
                                src="/assets/lovable-logo.png"
                                alt="Lovable AI Logo"
                              />
                              Lovable
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col w-full px-4 pb-4 leading-normal">
                          <h5 className="text-[17px] font-semibold leading-6 text-white/90">
                            High-performing UX for <br />
                            Gas Leak & Pipeline Monitoring App
                          </h5>
                        </div>
                        <div className="flex flex-row justify-start gap-2 w-full px-4 pb-4">
                          {/* Figma */}
                          <div
                            data-tooltip-id="figma"
                            data-tooltip-content="Figma"
                            className="w-7 h-7 rounded-full bg-turquoise-800 flex justify-center items-center cursor-pointer"
                          >
                            <img src={figmaLogo} alt="Figma Logo" />
                          </div>
                          <Tooltip id="figma" place="top" className="!text-xs !px-2 !py-[4px] !rounded !bg-black !text-white" />

                          {/* React */}
                          <div
                            data-tooltip-id="react"
                            data-tooltip-content="React"
                            className="w-7 h-7 rounded-full bg-turquoise-800 flex justify-center items-center cursor-pointer"
                          >
                            <img src={reactIcon} alt="React Logo" />
                          </div>
                          <Tooltip id="react" place="top" className="!text-xs !px-2 !py-[4px] !rounded !bg-black !text-white" />

                          {/* Tailwind */}
                          <div
                            data-tooltip-id="tailwind"
                            data-tooltip-content="Tailwind CSS"
                            className="w-7 h-7 rounded-full bg-turquoise-800 flex justify-center items-center cursor-pointer"
                          >
                            <img src={tailwindLogo} alt="Tailwind Logo" />
                          </div>
                          <Tooltip id="tailwind" place="top" className="!text-xs !px-2 !py-[4px] !rounded !bg-black !text-white" />

                          {/* Supabase */}
                          <div
                            data-tooltip-id="supabase"
                            data-tooltip-content="Supabase"
                            className="w-7 h-7 rounded-full bg-turquoise-800 flex justify-center items-center cursor-pointer"
                          >
                            <img src={supabaseLogo} alt="Supabase Logo" />
                          </div>
                          <Tooltip id="supabase" place="top" className="!text-xs !px-2 !py-[4px] !rounded !bg-black !text-white" />
                        </div>
                      </a>
                    </div>
                  </Reveal>
                </li>
                <li className="mb-16">
                  <div className="flex-start flex items-center">
                    <div className="-ms-[7px] me-0 h-[12px] w-[12px] rounded-full bg-turquoise-700/50 border-3 border-turquoise-300/50"></div>
                    <p className="flex mx-6 text-sm text-turquoise-700/50">
                      2026
                    </p>
                  </div>
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

          <div className="footer">© 2025 srikumar.design</div>
        </div>
      </div>
    </>
  );
};

export default VibeCodingApps;
