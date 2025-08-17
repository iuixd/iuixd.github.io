import React from "react";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import myPhoto from "../assets/myPhoto.webp";
import linkArrw from "../assets/external-link-arrow.svg";
import lovableLogo from "../assets/lovable-logo.svg";
import reactIcon from "../assets/react-icon.svg";
import supabaseLogo from "../assets/supabase-logo.svg";
import figmaLogo from "../assets/figma-logo.svg";
import githubLogo from "../assets/github-logo.svg";
import tailwindLogo from "../assets/tailwind-logo.svg";
import Consultant from "../assets/Consultant.svg";
import thumbnailLeakShield from "../assets/leakshield-thumbnail.webp";
import Reveal from "./Reveal";
import Footer from './Footer';

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
                          src={thumbnailLeakShield}
                          alt="Thubmnail to LeakShield - Vibe-Coding App"
                        />

                        <span
                          className="absolute flex justify-center items-center w-12 h-12 top-[16px] right-[24px] 
                          group-hover:motion-preset-fade-lg 
                          group-hover:-translate-y-4 group-hover:translate-x-6 transition-transform duration-300
                          rounded-full bg-transparent group-hover:bg-violet-300/50 -rotate-45"
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgb(255, 255, 255)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                        </span>

                        <div className="flex flex-col z-2 justify-between items-center w-full px-4 py-4 pb-0 text-[11px] text-white/70 bg-turquoise-600">
                          <div className="flex flex-col pb-4 w-full leading-normal">
                            <h1 className="text-[21px] font-semibold leading-7 tracking-wider text-white/90">
                              High-performing UX for a <br />
                              Control Center & Field App
                            </h1>
                          </div>
                          <div className="flex flex-row justify-between items-center w-full pb-4">
                            <div className="flex flex-row justify-start gap-2 w-fit">
                              {/* Figma */}
                              <div
                                data-tooltip-id="lovable"
                                data-tooltip-content="Lovable AI"
                                className="w-6 h-6 rounded-full bg-turquoise-800 flex justify-center items-center cursor-pointer"
                              >
                                <img src={lovableLogo} alt="Figma Logo" />
                              </div>
                              <Tooltip
                                id="lovable"
                                place="top"
                                className="!text-xs !px-2 !py-[4px] !rounded !bg-black !text-white"
                              />

                              {/* React */}
                              <div
                                data-tooltip-id="react"
                                data-tooltip-content="React"
                                className="w-6 h-6 rounded-full bg-turquoise-800 flex justify-center items-center cursor-pointer"
                              >
                                <img src={reactIcon} alt="React Logo" />
                              </div>
                              <Tooltip
                                id="react"
                                place="top"
                                className="!text-xs !px-2 !py-[4px] !rounded !bg-black !text-white"
                              />

                              {/* Tailwind */}
                              <div
                                data-tooltip-id="tailwind"
                                data-tooltip-content="Tailwind CSS"
                                className="w-6 h-6 rounded-full bg-turquoise-800 flex justify-center items-center cursor-pointer"
                              >
                                <img src={tailwindLogo} alt="Tailwind Logo" />
                              </div>
                              <Tooltip
                                id="tailwind"
                                place="top"
                                className="!text-xs !px-2 !py-[4px] !rounded !bg-black !text-white"
                              />

                              {/* Supabase */}
                              <div
                                data-tooltip-id="supabase"
                                data-tooltip-content="Supabase"
                                className="w-6 h-6 rounded-full bg-turquoise-800 flex justify-center items-center cursor-pointer"
                              >
                                <img src={supabaseLogo} alt="Supabase Logo" />
                              </div>
                              <Tooltip
                                id="supabase"
                                place="top"
                                className="!text-xs !px-2 !py-[4px] !rounded !bg-black !text-white"
                              />
                            </div>
                            <span className="w-fit text-xs font-light tracking-wide text-turquoise-200">
                              Jul 2025
                            </span>
                          </div>
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
          <Footer />
        </div>
      </div>
    </>
  );
};

export default VibeCodingApps;
