import React from "react";
import { motion } from "framer-motion";
import Reveal from './Reveal';
import Consultant from "../assets/Consultant.svg";
import IBMLogo from "../assets/IBMLogo.svg";
import targetLogo from "../assets/targetLogo.svg";
import imLogo from "../assets/imLogo.svg";
import ctLogo from "../assets/ctLogo.svg";
import qhLogo from "../assets/qhLogo.svg";
import dbsLogo from "../assets/dbsLogo.svg";
import fireeyeLogo from "../assets/fireeyeLogo.svg";
import mcafeeLogo from "../assets/mcafeeLogo.svg";
import aztecLogo from "../assets/aztecLogo.svg";

const logoMap = {
  Consultant,
  IBMLogo,
  targetLogo,
  imLogo,
  ctLogo,
  qhLogo,
  dbsLogo,
  fireeyeLogo,
  mcafeeLogo,
  aztecLogo,
};

const jobs = [
  {
    companyName: "Independent Consultant",
    designation: "UX Design Consultant",
    duration: "Oct 2024 to Present",
    logo: "Consultant",
    alt: "Independent Consultant Work",
  },
  {
    companyName: "IBM India Pvt Ltd",
    designation: "Senior Design Manager",
    duration: "Apr 2024 to Oct 2024",
    logo: "IBMLogo",
    alt: "IBM Logo",
  },
  {
    companyName: "Independent Consultant",
    designation: "UX Design Consultant",
    duration: "May 2023 to Mar 2024",
    logo: "Consultant",
    alt: "Independent Consultant Work",
  },
  {
    companyName: "Target Corp",
    designation: "Senior UX Manager",
    duration: "Aug 2022 to Apr 2023",
    logo: "targetLogo",
    alt: "Target Logo",
  },
  {
    companyName: "Innominds Software Pvt Ltd",
    designation: "Senior UX Manager",
    duration: "Sep 2021 to Jul 2022",
    logo: "imLogo",
    alt: "Innominds Logo",
  },
  {
    companyName: "Stealth Startups",
    designation: "UX Design Consultant",
    duration: "Mar 2020 to Sep 2021",
    logo: "Consultant",
    alt: "Independent Consultant Work",
  },
  {
    companyName: "ColorTokens",
    designation: "Senior UX Architect",
    duration: "Mar 2018 to Mar 2020",
    logo: "ctLogo",
    alt: "ColorTokens Logo",
  },
  {
    companyName: "Quick Heal Technologies",
    designation: "Senior UX Manager",
    duration: "Sep 2016 to Mar 2018",
    logo: "qhLogo",
    alt: "Quick Heal Technologies Logo",
  },
  {
    companyName: "DBS Bank Singapore",
    designation: "UI UX Tech Lead Consultant",
    duration: "Aug 2015 to Aug 2016",
    logo: "dbsLogo",
    alt: "DBS Bank Logo",
  },
  {
    companyName: "FireEye",
    designation: "UI UX Manager",
    duration: "Jan 2015 to May 2015",
    logo: "fireeyeLogo",
    alt: "FireEye Logo",
  },
  {
    companyName: "McAfee",
    designation: "UI UX Manager",
    duration: "May 2006 to Jan 2015",
    logo: "mcafeeLogo",
    alt: "McAfee Logo",
  },
  {
    companyName: "AZTEC Software",
    designation: "Senior UI Specialist",
    duration: "Aug 2005 to May 2006",
    logo: "aztecLogo",
    alt: "AZTEC Software Logo",
  },
];

const Work = () => (
  <section className="work-section">
      <Reveal>
      <h2 className="work-header">
        <svg
          className="work-header-icon"
          viewBox="0 0 16 16"
        >
          <path d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v8A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-8A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5m1.886 6.914L15 7.151V12.5a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5V7.15l6.614 1.764a1.5 1.5 0 0 0 .772 0M1.5 4h13a.5.5 0 0 1 .5.5v1.616L8.129 7.948a.5.5 0 0 1-.258 0L1 6.116V4.5a.5.5 0 0 1 .5-.5" />
        </svg>
        Work
      </h2>
      </Reveal>

      <div className="work-list">
        {jobs.map(({ companyName, designation, duration, logo, alt, customSize }) => (
          <Reveal key={`work-${duration}`}>
          <motion.div key={`${companyName}-${duration}`}
            className="work-wrapper cursor-default overflow-hidden">
            <div className="work-item">
              <div className="mr-2 items-center align-middle">
                <img
                  src={logoMap[logo]}
                  className="w-8 h-8"
                  alt={alt}
                />
              </div>
              <div className="sm:text-[14px] md:text-[14px] lg:text-[12px] max-[550px]:w-[150px] min-[550px]:w-[220px] lg:w-[180px]">
                <p className="font-semibold">{companyName}</p>
                <p className="text-turquoise-800">{designation}</p>
              </div>
            </div>
            <div className="work-duration">{duration}</div>
          </motion.div>
          </Reveal>
      ))}
      </div>
      <Reveal>
      <motion.a
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.1 }}
        className="group download-btn"
        href="https://www.dropbox.com/scl/fi/nkq0e28tzyotnzwdglgpg/Srikumar-Krishnan-Kutty-Resume.docx?rlkey=ek3mdehpjyx2jyyj3lvjgzqyk&e=1&st=dadeqmjx&dl=0"
        target="_blank"
        rel="noopener noreferrer"
      >
        Download CV
        <svg
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
          className="download-btn-icon"
        >
          <path
            d="M4.75 8.75 8 12.25m0 0 3.25-3.5M8 12.25v-8.5"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.a>
      </Reveal>
  </section>
);

export default Work;
