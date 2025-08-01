import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import myPhoto from "../assets/myPhoto.png";
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
                <li className="mb-16">
                  <div className="flex-start flex items-center pt-8">
                    <div className="-ms-[7px] me-0 h-[12px] w-[12px] rounded-full bg-turquoise-700/50 border-3 border-turquoise-300/50"></div>
                    <p className="flex mx-6 text-sm text-turquoise-700">2025</p>
                    
                    <Reveal>
                      <a
                        href="https://leakshield.lovable.app/"
                        target="_blank"
                        className="group flex flex-col w-[350px] h-fit p-6 items-center border border-white/70 hover:border-black/70 rounded-xl shadow-sm bg-white/20 hover:bg-turquoise-900 transition-all"
                      >
                        <div className="flex flex-row justify-between items-center w-full mb-6 text-[11px] text-black/70 group-hover:text-white/50">
                          <span className="text-left">August 1, 2025</span>
                          <div className="flex flex-row items-center gap-2">
                            <span className="text-right">On </span>
                            <span className="flex flex-row items-center gap-1 font-bold text-right">
                              <img
                                className="h-[10px]"
                                src="/assets/lovable-logo.png"
                                alt="Lovable AI Logo"
                              />
                              Lovable
                            </span>
                          </div>
                        </div>
                        <img
                          className="w-full"
                          src="/assets/leakshield-thumbnail.webp"
                          alt="Thubmnail to LeakShield - Vibe-Coding App"
                        />
                        <div className="flex flex-col mt-6 justify-between leading-normal">
                          <h5 className="mb-4 text-[17px] font-semibold leading-6 tracking-tight text-black group-hover:text-white">
                            Gas Leak & Pipeline Monitoring App
                          </h5>
                          <p className="text-[13px] font-normal text-black/70 group-hover:text-white/50">
                            Real-time UX for gas leak and pipeline safety monitoring in
                            control centers.
                          </p>
                        </div>
                      </a>
                    </Reveal>
                  </div>
                </li>
                <li className="mb-16">
                  <div className="flex-start flex items-center">
                    <div className="-ms-[7px] me-0 h-[12px] w-[12px] rounded-full bg-turquoise-700/75 border-3 border-turquoise-300/75"></div>
                    <p className="flex mx-6 text-sm text-turquoise-700/75">2026</p>
                  </div>
                </li>
                <li className="mb-16">
                  <div className="flex-start flex items-center">
                    <div className="-ms-[7px] me-0 h-[12px] w-[12px] rounded-full bg-turquoise-700/50 border-3 border-turquoise-300/50"></div>
                    <p className="flex mx-6 text-sm text-turquoise-700/50">2027</p>
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
