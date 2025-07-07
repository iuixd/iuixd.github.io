import React from "react";
import { motion } from "framer-motion";
import thumbnailWealthMgmt from "../assets/thumbnailWealthMgmt.png";
import thumbnailLumenAI from "../assets/thumbnailLumenAI.png";
import LumenaiLogo from "../assets/LumenaiLogo.gif";
import thumbnailDataPrivacy from "../assets/thumbnailDataPrivacy-2.png";
import thumbnailPetAdoption from "../assets/thumbnailPetAdoption-2.png";
import thumbnailZeroTrust from "../assets/thumbnailZeroTrust-2.png";
import thumbnailUnifiedDashboard from "../assets/thumbnailUnifiedDashboard-2.png";
import userResearch from "../assets/userResearch.png";

const thumbnailMap = {
  thumbnailWealthMgmt,
  userResearch,
  LumenaiLogo,
  thumbnailLumenAI,
  thumbnailDataPrivacy,
  thumbnailUnifiedDashboard,
  thumbnailZeroTrust,
  thumbnailPetAdoption,
};

const projects = [
  {
    thumbnail: "userResearch",
    youtubeLink: "https://www.youtube.com/watch?v=63SdhdrYhao",
    date: "May 2025",
    title: (
      <h2 className="text-lg font-semibold leading-tight">
        Smart Wealth, Smarter Guidance AI Solution
      </h2>
    ),
    titleText: "Smart Wealth, Smarter Guidance AI Solution",
    mainContent: (
      <>
        <p className="text-turquoise-900 mt-3 text-[13px]">
          Users often find personal finance tools overwhelming, fragmented, and impersonal. They seek proactive, transparent, and easy-to-act-on insights to help them make smarter financial decisions with confidence.
        </p>
        <p className="text-turquoise-900 mt-3 text-[13px]">
          The goal is to support wealth customers in making smarter financial decisions by combining AI-driven insights with human advisor collaboration.
        </p>
      </>
    ),
    responsibilityLabel: "Responsibilities",
    responsibilityContent: (
      <>
        <div>
          <span class="inline-flex items-center rounded-md bg-yellow-80p mr-1 mt-1 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-yellow-700/20 ring-inset">User Research</span>
          <span class="inline-flex items-center rounded-md bg-green-80p mr-1 mt-1 px-2 py-1 text-xs font-medium text-green-800 ring-1 ring-green-700/20 ring-inset">Product Design</span>
          <span class="inline-flex items-center rounded-md bg-blue-80p mr-1 mt-1 px-2 py-1 text-xs font-medium text-blue-800 ring-1 ring-blue-700/20 ring-inset">Design System</span>
        </div>
      </>
    ),
    casestudyLabel: "Case Study",
    casestudyLink:
      "https://www.dropbox.com/scl/fi/3syi8lbwbmvndim3g541i/Case-Study-01-Wealth-App-AI-Driven-Experience.pdf?rlkey=f9n95i0p5qsgip12221sefwaz&st=wvd0dudl&dl=0",
  },
  {
    thumbnail: "userResearch",
    youtubeLink: null,
    date: "Oct 2024",
    title: (
      <h2 className="text-lg font-semibold leading-tight">
        User Research to Automate and Optimize RCM through CBM Integration in IBM Maximo
      </h2>
    ),
    titleText: "User Research to Automate and Optimize RCM through CBM Integration in IBM Maximo",
    mainContent: (
        <p className="text-turquoise-900 mt-3 text-[13px]">
          Conducted primary and secondary user research to inform the automation and optimization of Reliability-Centered Maintenance (RCM) through integrated Condition-Based Monitoring (CBM) capabilities within IBM Maximo.
        </p>
    ),
    responsibilityLabel: "Responsibilities",
    responsibilityContent: (
      <>
        <div>
          <span class="inline-flex items-center rounded-md bg-yellow-80p mr-1 mt-1 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-yellow-700/20 ring-inset">User Research</span>
          <span class="inline-flex items-center rounded-md bg-green-80p mr-1 mt-1 px-2 py-1 text-xs font-medium text-green-800 ring-1 ring-green-700/20 ring-inset">Product Design</span>
          <span class="inline-flex items-center rounded-md bg-blue-80p mr-1 mt-1 px-2 py-1 text-xs font-medium text-blue-800 ring-1 ring-blue-700/20 ring-inset">Design System</span>
          <span class="inline-flex items-center rounded-md bg-indigo-80p mr-1 mt-1 px-2 py-1 text-xs font-medium text-yeindigollow-800 ring-1 ring-indigo-700/20 ring-inset">Design Team Management</span>
          <span class="inline-flex items-center rounded-md bg-purple-80p mr-1 mt-1 px-2 py-1 text-xs font-medium text-purple-800 ring-1 ring-purple-700/20 ring-inset">Design Strategy</span>
        </div>
      </>
    ),
    casestudyLabel: "Case Study",
    casestudyLink:
      "https://www.dropbox.com/scl/fi/6fjmboffcqennvyzhhi3t/Case-Study-02-Automate-and-Optimize-RCM-with-CBM-Integration.pdf?rlkey=gdx7yozogic5x2gq3eockvhdi&st=9u6c6ym7&dl=0",
  },
  {
    thumbnail: "LumenaiLogo",
    youtubeLink: null,
    date: "June 2023",
    title: <h2 className="text-lg font-semibold leading-tight">Logo Design</h2>,
    titleText: "Logo Design",
    mainContent: (
      <>
        <p className="text-turquoise-900 mt-3 text-[13px]">
          Lumen AI, an enterprise-grade AI/ML data extraction tool, is represented through a modern logo symbolizing innovation, precision, and automation.
        </p>
        <p className="text-turquoise-900 mt-3 text-[13px]">
          A radiant light motif reflects its power to illuminate insights from complex data, with gradient tones conveying depth and intelligence.
        </p>
      </>
    ),
    responsibilityLabel: "Responsibilities",
    responsibilityContent: (
      <>
        <div>
          <span class="inline-flex items-center rounded-md bg-yellow-80p mr-1 mt-1 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-yellow-700/20 ring-inset">Logo Design</span>
          <span class="inline-flex items-center rounded-md bg-green-80p mr-1 mt-1 px-2 py-1 text-xs font-medium text-green-800 ring-1 ring-green-700/20 ring-inset">Visual Communication</span>
          <span class="inline-flex items-center rounded-md bg-blue-80p mr-1 mt-1 px-2 py-1 text-xs font-medium text-blue-800 ring-1 ring-blue-700/20 ring-inset">Design Collaboration</span>
          <span class="inline-flex items-center rounded-md bg-purple-80p mr-1 mt-1 px-2 py-1 text-xs font-medium text-purple-800 ring-1 ring-purple-700/20 ring-inset">Animation</span>
        </div>
      </>
    ),
    casestudyLabel: "Case Study",
    casestudyLink: null,
  },
  {
    thumbnail: "thumbnailLumenAI",
    youtubeLink: "https://www.youtube.com/watch?v=cMCYiHNBtq4",
    date: "Dec 2023",
    title: (
      <h2 className="text-lg font-semibold leading-tight">
        Lumen AI Solutions
      </h2>
    ),
    titleText: "Lumen AI Solutions",
    mainContent: (
      <p className="text-turquoise-900 mt-3 text-[13px]">
        Lumen AI simplifies document workflows with an intuitive interface powered by AI. Its features such as data extraction, validation and summarization help users process documents faster with accuracy and ease.
      </p>
    ),
    responsibilityLabel: "Responsibilities",
    responsibilityContent: (
      <>
        <div>
          <span class="inline-flex items-center rounded-md bg-yellow-80p mr-1 mt-1 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-yellow-700/20 ring-inset">User Research</span>
          <span class="inline-flex items-center rounded-md bg-green-80p mr-1 mt-1 px-2 py-1 text-xs font-medium text-green-800 ring-1 ring-green-700/20 ring-inset">Product Design</span>
          <span class="inline-flex items-center rounded-md bg-blue-80p mr-1 mt-1 px-2 py-1 text-xs font-medium text-blue-800 ring-1 ring-blue-700/20 ring-inset">Design System</span>
        </div>
      </>
    ),
    casestudyLabel: "Case Study",
    casestudyLink: null,
  },
  {
    thumbnail: "thumbnailDataPrivacy",
    youtubeLink: "https://www.youtube.com/watch?v=UwCw4N5_6SI",
    date: "Jan 2021",
    title: (
      <h2 className="text-lg font-semibold leading-tight">
        Data security & privacy automation
      </h2>
    ),
    titleText: "Data security & privacy automation",
    mainContent: (
      <p className="text-turquoise-900 mt-3 text-[13px]">
        Help a data privacy and protection team in getting full visibility into data privacy risks and providing full control on PII security and risk remediation.
      </p>
    ),
    responsibilityLabel: "Responsibilities",
    responsibilityContent: (
      <>
        <div>
          <span class="inline-flex items-center rounded-md bg-yellow-80p mr-1 mt-1 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-yellow-700/20 ring-inset">User Research</span>
          <span class="inline-flex items-center rounded-md bg-green-80p mr-1 mt-1 px-2 py-1 text-xs font-medium text-green-800 ring-1 ring-green-700/20 ring-inset">Product Design</span>
          <span class="inline-flex items-center rounded-md bg-blue-80p mr-1 mt-1 px-2 py-1 text-xs font-medium text-blue-800 ring-1 ring-blue-700/20 ring-inset">Design System</span>
        </div>
      </>
    ),
    casestudyLabel: "Case Study",
    casestudyLink:
      "https://www.dropbox.com/scl/fi/twc10nxot3rp3otwmdc4x/Case-Study-03-Data-Security-Privacy-Automation.pdf?rlkey=4z15ur965rbhoo65bm6rz9u8z&st=orq5zy13&dl=0",
  },
  {
    thumbnail: "thumbnailUnifiedDashboard",
    youtubeLink: null,
    date: "Mar 2020",
    title: (
      <>
        <h2 className="text-lg font-semibold leading-tight">
          Unified Dashboard
        </h2>
        <h3 className="text-[13px] font-medium text-turquoise-900 mt-1 leading-tight">
          with actionable security insights
        </h3>
      </>
    ),
    titleText: "Unified Dashboard",
    mainContent: (
      <p className="text-turquoise-900 mt-3 text-[13px]">
        Designed dashboard to provide actionable security insights of the application groups, assets and network access for admin users to act-on.
      </p>
    ),
    responsibilityLabel: "Responsibilities",
    responsibilityContent: (
      <>
        <div>
          <span class="inline-flex items-center rounded-md bg-yellow-80p mr-1 mt-1 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-yellow-700/20 ring-inset">User Research</span>
          <span class="inline-flex items-center rounded-md bg-green-80p mr-1 mt-1 px-2 py-1 text-xs font-medium text-green-800 ring-1 ring-green-700/20 ring-inset">Product Design</span>
          <span class="inline-flex items-center rounded-md bg-purple-80p mr-1 mt-1 px-2 py-1 text-xs font-medium text-purple-800 ring-1 ring-purple-700/20 ring-inset">Design Strategy</span>
        </div>
      </>
    ),
    casestudyLabel: "Case Study",
    casestudyLink:
      "https://www.dropbox.com/scl/fi/8exq440g7csym7ceiomna/Case-Study-05-ColorToken-XShield-Dashboard.pdf?rlkey=x114gvby1eda4wg2mhdj935hm&st=hcpp4usr&dl=0",
  },
  {
    thumbnail: "thumbnailZeroTrust",
    youtubeLink: "https://www.youtube.com/watch?v=uW1a5iQ7u1Q&t=1s",
    date: "Dec 2018",
    title: (
        <h2 className="text-lg font-semibold leading-tight">
          Zero-trust Network Security
        </h2>
    ),
    titleText: "Zero-trust Network Security",
    mainContent: (
      <p className="text-turquoise-900 mt-3 text-[13px]">
        Redesign visibility of workload protection, applications flows with all network access to improve security monitoring and operational excellence.
      </p>
    ),
    responsibilityLabel: "Responsibilities",
    responsibilityContent: (
      <>
        <div>
          <span class="inline-flex items-center rounded-md bg-yellow-80p mr-1 mt-1 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-yellow-700/20 ring-inset">User Research</span>
          <span class="inline-flex items-center rounded-md bg-green-80p mr-1 mt-1 px-2 py-1 text-xs font-medium text-green-800 ring-1 ring-green-700/20 ring-inset">Product Design</span>
          <span class="inline-flex items-center rounded-md bg-purple-80p mr-1 mt-1 px-2 py-1 text-xs font-medium text-purple-800 ring-1 ring-purple-700/20 ring-inset">Design Strategy</span>
        </div>
      </>
    ),
    casestudyLabel: "Case Study",
    casestudyLink:
      "https://www.dropbox.com/scl/fi/pnqrjbkm0zv0f8hfeew1j/Case-Study-04-Zero-trust-Network-Security-Solution.pdf?rlkey=v5s0wbgwphxtvehyahvlymrrf&st=ztiylinz&dl=0",
  },
  {
    thumbnail: "thumbnailPetAdoption",
    youtubeLink: "https://www.youtube.com/watch?v=rYPZIdsFbAc&t=1s",
    date: "Mar 2020",
    title: (
        <h2 className="text-lg font-semibold leading-tight">
          Pet Adoption App
        </h2>
    ),
    titleText: "Pet Adoption App",
    mainContent: (
      <p className="text-turquoise-900 mt-3 text-[13px]">
        In India many pets are currently in shelters and pet-homes. Designed a mobile app that will help people looking for a new pet to connect with a right pet for them.
      </p>
    ),
    responsibilityLabel: "Responsibilities",
    responsibilityContent: (
      <>
        <div>
          <span class="inline-flex items-center rounded-md bg-yellow-80p mr-1 mt-1 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-yellow-700/20 ring-inset">User Research</span>
          <span class="inline-flex items-center rounded-md bg-green-80p mr-1 mt-1 px-2 py-1 text-xs font-medium text-green-800 ring-1 ring-green-700/20 ring-inset">Product Design</span>
          <span class="inline-flex items-center rounded-md bg-purple-80p mr-1 mt-1 px-2 py-1 text-xs font-medium text-purple-800 ring-1 ring-purple-700/20 ring-inset">Design Strategy</span>
        </div>
      </>
    ),
    casestudyLabel: "Case Study",
    casestudyLink:
      "https://www.dropbox.com/scl/fi/cvwbwioxa0r199o4v8am1/Case-Study-05-TakeMeHome-App.pdf?rlkey=idaqm9rsxkbhsnipzq2m7uthd&st=fbrd5dj4&dl=0",
  },
];

const ProjectCard = () => {
  return (
    <div className="flex flex-col size-[60%] mr-12">
      {projects.map(
        (
          {
            thumbnail,
            youtubeLink,
            date,
            title,
            titleText,
            mainContent,
            responsibilityLabel,
            responsibilityContent,
            casestudyLabel,
            casestudyLink,
          },
          index
        ) => {
          const showVideoLink = youtubeLink && youtubeLink !== null;
          const showCaseStudy = casestudyLink && casestudyLink !== null;

          return (
            <div
              key={`project-${index}`}
              className="group flex flex-row px-8 py-2 rounded-lg overflow-hidden w-full text-turquoise-900 transition-colors duration-100 ease-in-out hover:bg-turquoise-300 cursor-default"
            >
              <div className="relative flex flex-col items-center justify-center h-fit mt-3 mr-8 p-2 rounded-lg bg-white-20 group-hover:bg-turquoise-300 ">
                {showVideoLink && (
                  <a
                    href={youtubeLink}
                    className="absolute w-16 h-16 rounded-full bg-turquoise-300 opacity-50 hover:opacity-100 hover:w-17 hover:h-17 transition flex flex-col items-center justify-center cursor-pointer"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      className="ml-1 h-12 w-12 hover:w-13 hover:h-13 fill-turquoise-900"
                      viewBox="0 0 16 16"
                    >
                      <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393" />
                    </svg>
                  </a>
                )}

                <img
                  src={thumbnailMap[thumbnail]}
                  className="w-200 rounded-lg"
                  alt={`Thumbnail of ${titleText}`}
                />
              </div>

              <div className="w-350 opacity-90 group-hover:opacity-100 transition">
                <div className="text-turquoise-900 my-3 pl-2 leading-3 text-[13px] border-l-1 border-turquoise-900">
                  {date}
                </div>
                {title}

                {mainContent}

                <h4 className="text-[13px] mt-3 font-medium">
                  {responsibilityLabel}
                </h4>
                <p className="text-[13px]">{responsibilityContent}</p>

                {showCaseStudy ? (
                  <motion.a
                    href={casestudyLink} 
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.1 }}
                    className="flex flex-row w-fit text-[13px] px-1 py-2 my-4 rounded-md items-center font-bold text-[#3943B7] cursor-pointer transition  hover:font-bold hover:underline"
                    target="_blank"
                  >
                    {casestudyLabel}
                    <svg
                      className="ml-2 h-3 w-3 font-semibold stroke-[#3943B7]"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5"
                        strokeWidth="0.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z"
                        strokeWidth="0.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.a>
                ) : (
                  <p className="text-[13px] py-4">
                    <i>Design process available upon request</i>
                  </p>
                )}
              </div>
            </div>
          );
        }
      )}
    </div>
  );
};

export default ProjectCard;
