import React from "react";
import { Link } from "react-router-dom";
import myPhoto from "../assets/myPhoto.webp";
import thumbnailExplainerVideo from "../assets/thumbnailExplainerVideo.webp";
import Footer from "./Footer";
import Reveal from "./Reveal";
import VideoCard from "./VideoCard";

const AIVideos = () => {
  return (
    <>
      <div
        data-page-name="GenAI-Videos"
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
            
            <section className="flex h-full max-md:pl-[52px] max-md:pr-[20px] md:pl-[120px] pr-4 md:pr-0 pb-16">
              <ol className="h-full w-full">
                <li className="ml-0 md:ml-22 font-extrabold text-5xl md:text-7xl mb-4 md:mb-0 text-white">
                  <Reveal>
                    Gen AI <br />
                    <span className="opacity-60">Videos</span>
                  </Reveal>
                </li>
                
                <li className="mx-0 md:mx-22 py-6 md:py-8 font-medium">
                  <VideoCard 
                    thumbnailSrc={thumbnailExplainerVideo}
                    youtubeLink="https://www.youtube.com/watch?v=wZ10s6bX4X0"
                    date="Mar 2026"
                    title={<h2 className="card-content-title">How I Built a High-Quality Explainer Video Using AI (No Studio, Low Cost)</h2>}
                    mainContent={<p className="card-content card-content-paragraph">Create a professional explainer video without a studio or large budget. See how Arjun Mehta (AI avatar), motion design, and editing tools come together to simplify the creation of explainer videos for complex AI-powered agentic products.</p>}
                    responsibilityLabel="Tools used:"
                    responsibilityContent={
                      <>
                          <span className="card-badge">Script &amp; Storyboard + Timeline</span>
                          <span className="card-badge">Google Whisk for AI Avatar Clips</span>
                          <span className="card-badge">Adobe After Effects and Premiere Pro</span>
                      </>
                    }
                    casestudyLabel="View Design Approach"
                    casestudyLink="https://www.dropbox.com/scl/fi/g1m7cdp4u8yve4k8mfh2v/Case-Study-07-How-I-Built-a-High-Quality-Explainer-Video-Using-AI.pdf?rlkey=vzcyihfka1a1ziwczbko90itj&st=du56vaq4&dl=0"
                  />
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
