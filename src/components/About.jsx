import React from "react";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import myPhoto from "../assets/myPhoto.webp";
import college from "../assets/college.webp";
import designStudio from "../assets/design-studio.webp";
import productDesign from "../assets/product-design.webp";
// eslint-disable-next-line no-unused-vars
import linkArrw from "../assets/external-link-arrow.svg";
// eslint-disable-next-line no-unused-vars
import lovableLogo from "../assets/lovable-logo.svg";
// eslint-disable-next-line no-unused-vars
import reactIcon from "../assets/react-icon.svg";
// eslint-disable-next-line no-unused-vars
import supabaseLogo from "../assets/supabase-logo.svg";
// eslint-disable-next-line no-unused-vars
import figmaLogo from "../assets/figma-logo.svg";
// eslint-disable-next-line no-unused-vars
import githubLogo from "../assets/github-logo.svg";
// eslint-disable-next-line no-unused-vars
import tailwindLogo from "../assets/tailwind-logo.svg";
import Consultant from "../assets/Consultant.svg";
// eslint-disable-next-line no-unused-vars
import thumbnailLeakShield from "../assets/leakshield-thumbnail.webp";
import Reveal from "./Reveal";
import Footer from "./Footer";

const About = () => {
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
            className="max-md:ml-[52px] md:ml-[100px] lg:ml-[6px] mt-[12px] self-start relative z-101"
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

            <section className="flex h-full max-md:pl-[52px] max-md:pr-[20px] md:pl-[120px] pr-4 md:pr-0">
              <ol className="h-full w-full">
                <li className="ml-0 md:ml-22 font-extrabold text-5xl md:text-7xl mb-4 md:mb-0">
                  <Reveal>
                    About <br />
                    <span className="opacity-60">Me</span>
                  </Reveal>
                </li>
                <li className="mx-0 md:mx-22 py-6 md:py-8 font-medium text-base md:text-[18px] text-turquoise-900">
                  <Reveal>
                    <div className="p-6 md:p-8 bg-white rounded-2xl md:rounded-3xl shadow-md flex flex-col gap-6 md:gap-8">
                      <img
                        src={college}
                        className="w-auto h-auto rounded-3xl"
                        alt="Goverment College of Arts and Crafts, Chennai"
                      />
                      <p>
                        I'm a Product Designer and Design Leader with a
                        foundation in fine arts and a strong focus on designing
                        human-centered, scalable digital products. My journey
                        began at the{" "}
                        <mark className="font-extrabold">
                          Government College of Arts and Crafts, Chennai
                        </mark>
                        , where I developed a deep understanding of aesthetics,
                        form, and visual storytelling. These fundamentals
                        continue to shape my approach to design.
                      </p>
                    </div>
                  </Reveal>
                </li>
                <li className="mx-0 md:mx-22 py-6 md:py-8 font-medium text-base md:text-[18px] text-turquoise-900">
                  <Reveal>
                    <div className="p-6 md:p-8 bg-white rounded-2xl md:rounded-3xl shadow-md flex flex-col gap-6 md:gap-8">
                      <img
                        src={designStudio}
                        className="w-auto h-auto rounded-3xl"
                        alt="Goverment College of Arts and Crafts, Chennai"
                      />
                      <p>
                        Over the years, I have evolved from{" "}
                        <mark className="font-extrabold">
                          studio and visual design into user experience and
                          product design strategy
                        </mark>
                        , viewing design as a structured problem-solving
                        discipline that balances creativity with research,
                        empathy, and business goals. I have led UX design and
                        strategy across both early-stage and mature enterprise
                        platforms, spanning asset lifecycle and performance
                        management, reliability-centered maintenance, zero-trust
                        cybersecurity, AI-powered data privacy, governance and
                        security, as well as retail and banking domains.
                      </p>
                    </div>
                  </Reveal>
                </li>
                <li className="mx-0 md:mx-22 py-6 md:py-8 font-medium text-base md:text-[18px] text-turquoise-900">
                  <Reveal>
                    <div className="p-6 md:p-8 bg-white rounded-2xl md:rounded-3xl shadow-md flex flex-col gap-6 md:gap-8">
                      <img
                        src={productDesign}
                        className="w-auto h-auto rounded-3xl"
                        alt="Goverment College of Arts and Crafts, Chennai"
                      />
                      <p>
                        Designing meaningful human&ndash;AI interactions and
                        delivering measurable outcomes are central to my work. I
                        belive in empowering designers by creating clear vision
                        and collaborate closely with product, engineering, and
                        business stakeholders to translate complex technical
                        requirements into simple, intuitive, and effective user
                        experiences.
                      </p>
                      <p>
                        I ensure the design team aligns closely with design
                        thinking and PDLC frameworks to deliver user-centric
                        products. I also focus on alignment with stakeholders
                        and across disciplines, to enable design team to deliver
                        thoughtful, user-centered outcomes.
                      </p>
                      <p>
                        Beyond design, I actively invest in learning across
                        technology, systems, and emerging tools to strengthen
                        collaboration with engineering teams and inform better
                        design decisions. As a leader, I value clarity,
                        accountability, and thoughtful feedback, and I am
                        committed to building high-performing teams that deliver
                        with quality, ownership, and purpose.
                      </p>
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

export default About;
