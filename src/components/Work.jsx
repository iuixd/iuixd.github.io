import React from "react";
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

const jobs = [
  {
    companyName: "Independent Consultant",
    designation: "UX Design Consultant",
    duration: "Oct 2024 to Present",
    logo: (
      <img
        src={Consultant}
        className="w-8 h-8"
        alt="Independent Consultant Work"
      />
    ),
  },
  {
    companyName: "IBM India Pvt Ltd",
    designation: "Senior Design Manager",
    duration: "Apr 2024 to Oct 2024",
    logo: <img src={IBMLogo} className="w-8 h-8" alt="IBM Logo" />,
  },
  {
    companyName: "Independent Consultant",
    designation: "UX Design Consultant",
    duration: "May 2023 to Mar 2024",
    logo: (
      <img
        src={Consultant}
        className="w-8 h-8"
        alt="Independent Consultant Work"
      />
    ),
  },
  {
    companyName: "Target Corp",
    designation: "Senior UX Manager",
    duration: "Aug 2022 to Apr 2023",
    logo: <img src={targetLogo} className="w-8 h-7" alt="Target Logo" />,
  },
  {
    companyName: "Innominds Software Pvt Ltd",
    designation: "Senior UX Manager",
    duration: "Sep 2021 to Jul 2022",
    logo: <img src={imLogo} className="w-8 h-8" alt="Innominds Logo" />,
  },
  {
    companyName: "Stealth Startups",
    designation: "UX Design Consultant",
    duration: "Mar 2020 to Sep 2021",
    logo: (
      <img
        src={Consultant}
        className="w-8 h-8"
        alt="Independent Consultant Work"
      />
    ),
  },
  {
    companyName: "ColorTokens",
    designation: "Senior UX Architect",
    duration: "Mar 2018 to Mar 2020",
    logo: <img src={ctLogo} className="w-8 h-8" alt="ColorTokens Logo" />,
  },
  {
    companyName: "Quick Heal Technologies",
    designation: "Senior UX Manager",
    duration: "Sep 2016 to Mar 2018",
    logo: (
      <img
        src={qhLogo}
        className="w-8 h-8"
        alt="Quick Heal Technologies Logo"
      />
    ),
  },
  {
    companyName: "DBS Bank Singapore",
    designation: "UI UX Tech Lead Consultant",
    duration: "Aug 2015 to Aug 2016",
    logo: <img src={dbsLogo} className="w-8 h-8" alt="DBS Bank Logo" />,
  },
  {
    companyName: "FireEye",
    designation: "UI UX Manager",
    duration: "Jan 2015 to May 2015",
    logo: <img src={fireeyeLogo} className="w-8 h-8" alt="FireEye Logo" />,
  },
  {
    companyName: "McAfee",
    designation: "UI UX Manager",
    duration: "May 2006 to Jan 2015",
    logo: <img src={mcafeeLogo} className="w-8 h-8" alt="McAfee Logo" />,
  },
  {
    companyName: "AZTEC Software",
    designation: "Senior UI Specialist",
    duration: "Aug 2005 to May 2006",
    logo: <img src={aztecLogo} className="w-8 h-8" alt="AZTEC Software Logo" />,
  },
];

const Work = () => {
  return (
    <>
      <div className="work-section">
        <div className="w-auto">
          <h2 className="work-header">
            <svg
              className="h-5 w-5 mr-2 fill-turquoise-800 group-hover:fill-turquoise-500 transition"
              viewBox="0 0 16 16"
            >
              <path d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v8A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-8A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5m1.886 6.914L15 7.151V12.5a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5V7.15l6.614 1.764a1.5 1.5 0 0 0 .772 0M1.5 4h13a.5.5 0 0 1 .5.5v1.616L8.129 7.948a.5.5 0 0 1-.258 0L1 6.116V4.5a.5.5 0 0 1 .5-.5" />
            </svg>
            Work
          </h2>

          {jobs.map(({ companyName, designation, duration, logo }) => (
            <>
              <div className="work-wrapper">
                <div className="work-item">
                  <div className="mr-2 items-center align-middle">{logo}</div>
                  <div className="text-[12px] w-[200px]">
                    <p className="font-semibold">{companyName}</p>
                    <p className="text-turquoise-800">{designation}</p>
                  </div>
                </div>
                <div className="work-duration">
                  {duration}
                </div>
              </div>
            </>
          ))}

          <a
            className="group download-btn"
            href="https://www.dropbox.com/scl/fi/nkq0e28tzyotnzwdglgpg/Srikumar-Krishnan-Kutty-Resume.docx?rlkey=ek3mdehpjyx2jyyj3lvjgzqyk&e=1&st=dadeqmjx&dl=0"
            target="_blank"
          >
            Download CV
            <svg
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
              className="h-4 w-4 stroke-turquoise-700 transition group-hover:stroke-turquoise-900"
            >
              <path
                d="M4.75 8.75 8 12.25m0 0 3.25-3.5M8 12.25v-8.5"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
          </a>
        </div>
      </div>
    </>
  );
};

export default Work;
