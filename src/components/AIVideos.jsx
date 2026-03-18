import React from "react";
import { Link } from "react-router-dom";
import myPhoto from "../assets/myPhoto.webp";
import Footer from "./Footer";
import Reveal from "./Reveal";

const AIVideos = () => {
  return (
    <>
      <div
        data-page-name="ai-videos"
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
            <img src={myPhoto} className="w-12 h-12" alt="Srikumar's Photo" />
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
            
            <section className="flex h-full max-md:pl-[52px] max-md:pr-[20px] md:pl-[120px] pr-4 md:pr-0 pb-16">
              <ol className="h-full w-full">
                <li className="ml-0 md:ml-22 font-extrabold text-5xl md:text-7xl mb-4 md:mb-0 text-white">
                  <Reveal>
                    AI <br />
                    <span className="opacity-60">Videos</span>
                  </Reveal>
                </li>
                
                <li className="mx-0 md:mx-22 py-6 md:py-8 font-medium">
                  <Reveal>
                    <div className="p-6 md:p-8 bg-white rounded-2xl md:rounded-3xl shadow-md flex items-center justify-center min-h-[300px] w-full text-turquoise-900 font-sans antialiased text-center">
                      <p className="text-sm font-medium tracking-wide opacity-80">Coming soon...</p>
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

export default AIVideos;
