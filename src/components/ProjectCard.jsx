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
      <h2 className="card-content-title">
        Smart Wealth, Smarter Guidance AI Solution
      </h2>
    ),
    titleText: "Smart Wealth, Smarter Guidance AI Solution",
    mainContent: (
      <>
        <p className="card-content card-content-paragraph">
          Wealth customers often find personal finance tools overwhelming and impersonal. They seek clear, actionable insights. The goal is to empower them with AI-driven guidance enhanced by human advisor collaboration to support smarter financial decisions.
        </p>
      </>
    ),
    responsibilityLabel: "Responsibilities",
    responsibilityContent: (
      <>
          <span class="card-badge card-badge-yellow">User Research</span>
          <span class="card-badge card-badge-green">Product Design</span>
          <span class="card-badge card-badge-red">Design System</span>
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
      <h2 className="card-content-title">
        User Research to Automate and Optimize RCM through CBM Integration in IBM Maximo
      </h2>
    ),
    titleText: "User Research to Automate and Optimize RCM through CBM Integration in IBM Maximo",
    mainContent: (
        <p className="card-content card-content-paragraph">
          Conducted primary and secondary user research to inform the automation and optimization of Reliability-Centered Maintenance (RCM) through integrated Condition-Based Monitoring (CBM) capabilities within IBM Maximo.
        </p>
    ),
    responsibilityLabel: "Responsibilities",
    responsibilityContent: (
      <>
          <span class="card-badge card-badge-yellow">User Research</span>
          <span class="card-badge card-badge-blue">Team Collaboration</span>
          <span class="card-badge card-badge-indigo">Managed Team</span>
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
    title: <h2 className="card-content-title">Logo Design</h2>,
    titleText: "Logo Design",
    mainContent: (
      <>
        <p className="card-content card-content-paragraph">
          Lumen AI’s modern logo symbolizes innovation, precision, and automation, using a radiant light motif and gradient tones to reflect its ability to illuminate insights from complex data.
        </p>
      </>
    ),
    responsibilityLabel: "Responsibilities",
    responsibilityContent: (
      <>
          <span class="card-badge card-badge-yellow">Logo Design</span>
          <span class="card-badge card-badge-blue">Team Collaboration</span>
          <span class="card-badge card-badge-purple">Animation</span>
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
      <h2 className="card-content-title">
        Lumen AI Solutions
      </h2>
    ),
    titleText: "Lumen AI Solutions",
    mainContent: (
      <p className="card-content card-content-paragraph">
        Lumen AI simplifies document workflows with an intuitive interface powered by AI. Its features such as data extraction, validation and summarization help users process documents faster with accuracy and ease.
      </p>
    ),
    responsibilityLabel: "Responsibilities",
    responsibilityContent: (
      <>
          <span class="card-badge card-badge-yellow">User Research</span>
          <span class="card-badge card-badge-green">Product Design</span>
          <span class="card-badge card-badge-red">Design System</span>
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
      <h2 className="card-content-title">
        Data security & privacy automation
      </h2>
    ),
    titleText: "Data security & privacy automation",
    mainContent: (
      <p className="card-content card-content-paragraph">
        Help a data privacy and protection team in getting full visibility into data privacy risks and providing full control on PII security and risk remediation.
      </p>
    ),
    responsibilityLabel: "Responsibilities",
    responsibilityContent: (
      <>
          <span class="card-badge card-badge-yellow">User Research</span>
          <span class="card-badge card-badge-green">Product Design</span>
          <span class="card-badge card-badge-red">Design System</span>
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
        <h2 className="card-content-title">
          Unified Dashboard
        </h2>
        <h3 className="text-[13px] font-medium text-turquoise-900 mt-1 leading-tight">
          with actionable security insights
        </h3>
      </>
    ),
    titleText: "Unified Dashboard",
    mainContent: (
      <p className="card-content card-content-paragraph">
        Designed dashboard to provide actionable security insights of the application groups, assets and network access for admin users to act-on.
      </p>
    ),
    responsibilityLabel: "Responsibilities",
    responsibilityContent: (
      <>
          <span class="card-badge card-badge-yellow">User Research</span>
          <span class="card-badge card-badge-green">Product Design</span>
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
        <h2 className="card-content-title">
          Zero-trust Network Security
        </h2>
    ),
    titleText: "Zero-trust Network Security",
    mainContent: (
      <p className="card-content card-content-paragraph">
        Redesign visibility of workload protection, applications flows with all network access to improve security monitoring and operational excellence.
      </p>
    ),
    responsibilityLabel: "Responsibilities",
    responsibilityContent: (
      <>
          <span class="card-badge card-badge-yellow">User Research</span>
          <span class="card-badge card-badge-green">Product Design</span>
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
        <h2 className="card-content-title">
          Pet Adoption App
        </h2>
    ),
    titleText: "Pet Adoption App",
    mainContent: (
      <p className="card-content card-content-paragraph">
        In India many pets are currently in shelters and pet-homes. Designed a mobile app that will help people looking for a new pet to connect with a right pet for them.
      </p>
    ),
    responsibilityLabel: "Responsibilities",
    responsibilityContent: (
      <>
          <span class="card-badge card-badge-yellow">User Research</span>
          <span class="card-badge card-badge-green">Product Design</span>
      </>
    ),
    casestudyLabel: "Case Study",
    casestudyLink:
      "https://www.dropbox.com/scl/fi/cvwbwioxa0r199o4v8am1/Case-Study-05-TakeMeHome-App.pdf?rlkey=idaqm9rsxkbhsnipzq2m7uthd&st=fbrd5dj4&dl=0",
  },
];

const ProjectCard = () => {
  return (
    <div className="flex flex-col min-[360px]:mr-0 sm:mr-0 md:mr-0 lg:mr-12 min-[320px]:size-[100%] sm:size-[100%] md:size-[100%] lg:size-[50%] xl:size-[60%] sm:items-center md:items-center sm:justify-center md:justify-center lg:items-normal lg:justify-normal">
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
          const isLumenLogo = "LumenaiLogo";

          return (
            <div
              key={`project-${index}`}
              className="card-wrapper"
            >
              <div className="card-thumbnail-wrapper">
                {showVideoLink && (
                  <a
                    href={youtubeLink}
                    className="video-play-btn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      className="video-play-icon"
                      viewBox="0 0 16 16"
                    >
                      <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393" />
                    </svg>
                  </a>
                )}

                <img
                  src={thumbnailMap[thumbnail]}
                  className={isLumenLogo === "LumenaiLogo" ? "min-[360px]:w-120 sm:w-120 lg:w-120 xl:w-150 rounded-lg" : "min-[360px]:w-120 sm:w-120 lg:w-120 xl:w-200 rounded-lg"}  
                  alt={`Thumbnail of ${titleText}`}
                />
              </div>

              <div className="card-content-wrapper">
                <div className="card-content card-content-date">
                  {date}
                </div>
                {title}

                {mainContent}

                <h4 className="card-content card-content-subtitle">
                  {responsibilityLabel}
                </h4>
                <div>{responsibilityContent}</div>

                {showCaseStudy ? (
                  <a
                    href={casestudyLink} 
                    className="card-content card-content-link"
                    target="_blank"
                  >
                    {casestudyLabel}
                    <svg
                      className="ml-2 h-3 w-3 font-semibold"
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
                  </a>
                ) : (
                  <p className="card-content card-content-footer">
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
