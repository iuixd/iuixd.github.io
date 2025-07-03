import React from "react";
import thumbnailCBM from '../assets/thumbnailCBM.png';
import thumbnailWealthMgmt from '../assets/thumbnailWealthMgmt.png';
import thumbnailLumenAI from '../assets/thumbnailLumenAI.png';
import LumenaiLogo from '../assets/LumenaiLogo.gif';
import thumbnailDataPrivacy from '../assets/thumbnailDataPrivacy.png';
import thumbnailPetAdoption from '../assets/thumbnailPetAdoption.png';
import thumbnailZeroTrust from '../assets/thumbnailZeroTrust.png';
import thumbnailUnifiedDashboard from '../assets/thumbnailUnifiedDashboard.png';
import userResearch from '../assets/userResearch.png';

const ProjectCard = () => {
  return (
    <>
      <div className="flex flex-col size-[55%] mr-12">
        <div className="group flex flex-row px-8 py-2 rounded-lg overflow-hidden w-full text-turquoise-900 transition-colors duration-500 ease-in-out hover:bg-turquoise-300 cursor-default">
          <div className="mr-8 relative flex flex-col items-center justify-center">
            <a
              href="https://www.youtube.com/watch?v=63SdhdrYhao"
              className="absolute w-16 h-16 rounded-full bg-turquoise-300 opacity-50 hover:opacity-100 hover:w-17 hover:h-17  transition flex flex-col items-center justify-center cursor-pointer"
              target="_blank"
            >
              <svg
                className="ml-1 h-12 w-12 hover:w-13 hover:h-13 fill-turquoise-900"
                viewBox="0 0 16 16"
              >
                <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393" />
              </svg>
            </a>
            <img
              src={thumbnailWealthMgmt}
              className="w-4xl rounded-lg"
              alt="Thumbnail of Smart Wealth, Smarter Guidance AI Solutions"
            />
          </div>
          <div className="w-350 opacity-90 group-hover:opacity-100 transition">
            <div className="text-turquoise-900 my-3 pl-2 leading-3 text-[13px] border-l-1 border-turquoise-900">
              May 2025
            </div>
            <h2 className="text-lg font-semibold leading-tight">
              Smart Wealth, Smarter Guidance AI Solution
            </h2>
            <p className="text-turquoise-900 mt-3 text-[13px]">
              Users often find personal finance tools overwhelming, fragmented,
              and impersonal. They seek proactive, transparent, and
              easy-to-act-on insights to help them make smarter financial
              decisions with confidence.
            </p>
            <p className="text-turquoise-900 mt-3 text-[13px]">
              The goal is to support wealth customers in making smarter
              financial decisions by combining AI-driven insights with human
              advisor collaboration.
            </p>
            <h3 className="text-turquoise-900 mt-3 text-[13px]">Scope:</h3>

            <ul className="text-turquoise-900 mt-3 ml-4 text-[13px] list-disc">
              <li>AI Assistant integration</li>
              <li>Daily/weekly nudges</li>
              <li>Insight transparency & user feedback</li>
              <li>Actionable recommendations</li>
            </ul>

            <h4 className="text-[13px] mt-3 font-medium">Responsibilities</h4>
            <p className="text-[13px]">
              Design Strategy, User Research, Product Design, Design System
            </p>
            <a
              href="https://www.dropbox.com/scl/fi/3syi8lbwbmvndim3g541i/Case-Study-01-Wealth-App-AI-Driven-Experience.pdf?rlkey=f9n95i0p5qsgip12221sefwaz&st=wvd0dudl&dl=0"
              className="flex flex-row text-[13px] py-4 items-center font-bold text-[#3943B7] cursor-pointer transition hover:translate-x-1 hover:scale-102 hover:font-bold hover:underline"
              target="_blank"
            >
              Case Study
              <svg
                className="ml-2 h-3 w-3 font-semibold stroke-[#3943B7]"
                viewBox="0 0 16 16"
              >
                <path
                  d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5"
                  stroke-width="1.2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z"
                  stroke-width="1.2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>

        <div className="group flex flex-row px-8 py-2 rounded-lg overflow-hidden w-full text-turquoise-900 transition-colors duration-500 ease-in-out hover:bg-turquoise-300 cursor-default">
          <div className="mr-8 relative flex flex-col items-center justify-center">
            <img
              src={userResearch}
              className="w-4xl rounded-lg"
              alt="Thumbnail of RCM and CBM AI Solutions"
            />
          </div>
          <div className="w-350 opacity-90 group-hover:opacity-100 transition">
            <div className="text-turquoise-900 my-3 pl-2 leading-3 text-[13px] border-l-1 border-turquoise-900">
              Oct 2024
            </div>
            <h2 className="text-lg font-semibold leading-tight">
              Automate and Optimize RCM with CBM Integration
            </h2>
            <p className="text-turquoise-900 mt-3 text-[13px]">
              Maximo IBM's platform for managing the lifecycle, performance and
              maintenance of critical assets in industries like maintenance,
              energy oil & gas, transportation and more.
            </p>
            <h3 className="text-turquoise-900 mt-3 text-[13px]">
              It includes tools for:
            </h3>

            <ul className="text-turquoise-900 mt-3 ml-4 text-[13px] list-disc">
              <li>Work and maintenance management</li>
              <li>Reliability (RCM) and condition-based monitoring (CBM)</li>
              <li>Inventory and Procurement</li>
              <li>Asset health insights and AI-driven predictions</li>
            </ul>

            <h4 className="text-[13px] mt-3 font-medium">Responsibilities</h4>
            <p className="text-[13px]">
              Design Team Management, Design Strategy, User Research, Product
              Design, Support Design System
            </p>
            <a
              href="https://www.dropbox.com/scl/fi/6fjmboffcqennvyzhhi3t/Case-Study-02-Automate-and-Optimize-RCM-with-CBM-Integration.pdf?rlkey=gdx7yozogic5x2gq3eockvhdi&st=9u6c6ym7&dl=0"
              className="flex flex-row text-[13px] py-4 items-center font-bold text-[#3943B7] cursor-pointer transition hover:translate-x-1 hover:scale-102 hover:font-bold hover:underline"
              target="_blank"
            >
              Case Study
              <svg
                className="ml-2 h-3 w-3 font-semibold stroke-[#3943B7]"
                viewBox="0 0 16 16"
              >
                <path
                  d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5"
                  stroke-width="1.2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z"
                  stroke-width="1.2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>

        <div className="group flex flex-row px-8 py-2 rounded-lg overflow-hidden w-full text-turquoise-900 transition-colors duration-500 ease-in-out hover:bg-turquoise-300 cursor-default">
          <div className="mr-8 relative flex flex-col items-center justify-center">
            <img
              src={LumenaiLogo}
              className="w-4xl rounded-lg"
              alt="Thumbnail of Lumen AI Logo Animation"
            />
          </div>
          <div className="w-350 opacity-90 group-hover:opacity-100 transition">
            <div className="text-turquoise-900 my-3 pl-2 leading-3 text-[13px] border-l-1 border-turquoise-900">
              June 2023
            </div>
            <h2 className="text-lg font-semibold leading-tight">Logo Design</h2>
            <p className="text-turquoise-900 mt-3 text-[13px]">
              Lumen AI, an enterprise-grade AI/ML data extraction tool, is
              represented through a modern logo symbolizing innovation,
              precision, and automation.
            </p>
            <p className="text-turquoise-900 mt-3 text-[13px]">
              A radiant light motif reflects its power to illuminate insights
              from complex data, with gradient tones conveying depth and
              intelligence.
            </p>
            <h4 className="text-[13px] mt-3 font-medium">Responsibilities</h4>
            <p className="text-[13px]">
              Logo Design, Branding, Visual Communication, Animation, Design
              Collaboration
            </p>
            <p className="text-[13px] py-4">
              <i>Design process available upon request</i>
            </p>
          </div>
        </div>

        <div className="group flex flex-row px-8 py-2 rounded-lg overflow-hidden w-full text-turquoise-900 transition-colors duration-500 ease-in-out hover:bg-turquoise-300 cursor-default">
          <div className="mr-8 relative flex flex-col items-center justify-center">
            <a
              href="https://www.youtube.com/watch?v=cMCYiHNBtq4"
              className="absolute w-16 h-16 rounded-full bg-turquoise-300 opacity-50 hover:opacity-100 hover:w-17 hover:h-17 transition flex flex-col items-center justify-center cursor-pointer"
              target="_blank"
            >
              <svg
                className="ml-1 h-12 w-12 hover:w-13 hover:h-13 fill-turquoise-900"
                viewBox="0 0 16 16"
              >
                <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393" />
              </svg>
            </a>
            <img
              src={thumbnailLumenAI}
              className="w-4xl rounded-lg"
              alt="Thumbnail of Lumen AI Solutions"
            />
          </div>
          <div className="w-350 opacity-90 group-hover:opacity-100 transition">
            <div className="text-turquoise-900 my-3 pl-2 leading-3 text-[13px] border-l-1 border-turquoise-900">
              Dec 2023
            </div>
            <h2 className="text-lg font-semibold leading-tight">
              Lumen AI Solutions
            </h2>
            <p className="text-turquoise-900 mt-3 text-[13px]">
              Lumen AI simplifies document workflows with an intuitive interface
              powered by AI. Its features such as data extraction, validation
              and summarization help users process documents faster with
              accuracy and ease.
            </p>
            <h4 className="text-[13px] mt-3 font-medium">Responsibilities</h4>
            <p className="text-[13px]">
              User Research, Product Design, Design System
            </p>
            <p className="text-[13px] py-4">
              <i>Design process available upon request</i>
            </p>
          </div>
        </div>

        <div className="group flex flex-row px-8 py-2 rounded-lg overflow-hidden w-full text-turquoise-900 transition-colors duration-500 ease-in-out hover:bg-turquoise-300 cursor-default">
          <div className="mr-8 relative flex flex-col items-center justify-center">
            <a
              href="https://www.youtube.com/watch?v=UwCw4N5_6SI"
              className="absolute w-16 h-16 rounded-full bg-turquoise-300 opacity-50 hover:opacity-100 hover:w-17 hover:h-17  transition flex flex-col items-center justify-center cursor-pointer"
              target="_blank"
            >
              <svg
                className="ml-1 h-12 w-12 hover:w-13 hover:h-13 fill-turquoise-900"
                viewBox="0 0 16 16"
              >
                <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393" />
              </svg>
            </a>
            <img
              src={thumbnailDataPrivacy}
              className="w-4xl rounded-lg"
              alt="Thumbnail of Data security & privacy automation"
            />
          </div>
          <div className="w-350 opacity-90 group-hover:opacity-100 transition">
            <div className="text-turquoise-900 my-3 pl-2 leading-3 text-[13px] border-l-1 border-turquoise-900">
              Jan 2021
            </div>
            <h2 className="text-lg font-semibold leading-tight">
              Data security & privacy automation
            </h2>
            <p className="text-turquoise-900 mt-3 text-[13px]">
              Help a data privacy and protection team in getting full visibility
              into data privacy risks and providing full control on PII security
              and risk remediation.
            </p>
            <h4 className="text-[13px] mt-3 font-medium">Responsibilities</h4>
            <p className="text-[13px]">
              User Research, Product Design, Design System
            </p>
            <a
              href="https://www.dropbox.com/scl/fi/twc10nxot3rp3otwmdc4x/Case-Study-03-Data-Security-Privacy-Automation.pdf?rlkey=4z15ur965rbhoo65bm6rz9u8z&st=orq5zy13&dl=0"
              className="flex flex-row text-[13px] py-4 items-center font-bold text-[#3943B7] cursor-pointer transition hover:translate-x-1 hover:scale-102 hover:font-bold hover:underline"
              target="_blank"
            >
              Case Study
              <svg
                className="ml-2 h-3 w-3 font-semibold stroke-[#3943B7]"
                viewBox="0 0 16 16"
              >
                <path
                  d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5"
                  stroke-width="1.2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z"
                  stroke-width="1.2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>

        <div className="group flex flex-row px-8 py-2 rounded-lg overflow-hidden w-full text-turquoise-900 transition-colors duration-500 ease-in-out hover:bg-turquoise-300 cursor-default">
          <div className="mr-8 relative flex flex-col items-center justify-center">
            <img
              src={thumbnailUnifiedDashboard}
              className="w-4xl rounded-lg"
              alt="Thumbnail of Unified Dashboard"
            />
          </div>
          <div className="w-350 opacity-90 group-hover:opacity-100 transition">
            <div className="text-turquoise-900 my-3 pl-2 leading-3 text-[13px] border-l-1 border-turquoise-900">
              Mar 2020
            </div>
            <h2 className="text-lg font-semibold leading-tight">
              Unified Dashboard
            </h2>
            <h3 className="text-[13px] font-medium text-turquoise-900 mt-1 leading-tight">
              with actionable security insights
            </h3>
            <p className="text-turquoise-900 mt-3 text-[13px]">
              Designed dashboard to provide actionable security insights of the
              application groups, assets and network access for admin users to
              act-on.
            </p>
            <h4 className="text-[13px] mt-3 font-medium">Responsibilities</h4>
            <p className="text-[13px]">
              Design Thinking, Product Strategy, UX/UI Design, Data Analysis,
              Led Design Team
            </p>
            <a
              href="https://www.dropbox.com/scl/fi/8exq440g7csym7ceiomna/Case-Study-05-ColorToken-XShield-Dashboard.pdf?rlkey=x114gvby1eda4wg2mhdj935hm&st=hcpp4usr&dl=0"
              className="flex flex-row text-[13px] py-4 items-center font-bold text-[#3943B7] cursor-pointer transition hover:translate-x-1 hover:scale-102 hover:font-bold hover:underline"
              target="_blank"
            >
              Case Study
              <svg
                className="ml-2 h-3 w-3 font-semibold stroke-[#3943B7]"
                viewBox="0 0 16 16"
              >
                <path
                  d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5"
                  stroke-width="1.2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z"
                  stroke-width="1.2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>

        <div className="group flex flex-row px-8 py-2 rounded-lg overflow-hidden w-full text-turquoise-900 transition-colors duration-500 ease-in-out hover:bg-turquoise-300 cursor-default">
          <div className="mr-8 relative flex flex-col items-center justify-center">
            <a
              href="https://www.youtube.com/watch?v=uW1a5iQ7u1Q&t=1s"
              className="absolute w-16 h-16 rounded-full bg-turquoise-300 opacity-50 hover:opacity-100  hover:w-17 hover:h-17 transition flex flex-col items-center justify-center cursor-pointer"
              target="_blank"
            >
              <svg
                className="ml-1 h-12 w-12 hover:w-13 hover:h-13 fill-turquoise-900"
                viewBox="0 0 16 16"
              >
                <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393" />
              </svg>
            </a>
            <img
              src={thumbnailZeroTrust}
              className="w-4xl rounded-lg"
              alt="Thumbnail of Zero-trust Network Security"
            />
          </div>
          <div className="w-350 opacity-90 group-hover:opacity-100 transition">
            <div className="text-turquoise-900 my-3 pl-2 leading-3 text-[13px] border-l-1 border-turquoise-900">
              Dec 2018
            </div>
            <h2 className="text-lg font-semibold leading-tight">
              Zero-trust Network Security
            </h2>
            <p className="text-turquoise-900 mt-3 text-[13px]">
              Redesign visibility of workload protection, applications flows
              with all network access to improve security monitoring and
              operational excellence.
            </p>
            <h4 className="text-[13px] mt-3 font-medium">Responsibilities</h4>
            <p className="text-[13px]">
              Design Thinking, Product Strategy, UX/UI Design, Data Analysis,
              Led Design Team
            </p>
            <a
              href="https://www.dropbox.com/scl/fi/pnqrjbkm0zv0f8hfeew1j/Case-Study-04-Zero-trust-Network-Security-Solution.pdf?rlkey=v5s0wbgwphxtvehyahvlymrrf&st=ztiylinz&dl=0"
              className="flex flex-row text-[13px] py-4 items-center font-bold text-[#3943B7] cursor-pointer transition hover:translate-x-1 hover:scale-102 hover:font-bold hover:underline"
              target="_blank"
            >
              Case Study
              <svg
                className="ml-2 h-3 w-3 font-semibold stroke-[#3943B7]"
                viewBox="0 0 16 16"
              >
                <path
                  d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5"
                  stroke-width="1.2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z"
                  stroke-width="1.2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>

        <div className="group flex flex-row px-8 py-2 rounded-lg overflow-hidden w-full text-turquoise-900 transition-colors duration-500 ease-in-out hover:bg-turquoise-300 cursor-default">
          <div className="mr-8 relative flex flex-col items-center justify-center">
            <a
              href="https://www.youtube.com/watch?v=rYPZIdsFbAc&t=1s"
              className="absolute w-16 h-16 rounded-full bg-turquoise-300 opacity-50 hover:opacity-100  hover:w-17 hover:h-17 transition flex flex-col items-center justify-center cursor-pointer"
              target="_blank"
            >
              <svg
                className="ml-1 h-12 w-12 hover:w-13 hover:h-13 fill-turquoise-900"
                viewBox="0 0 16 16"
              >
                <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393" />
              </svg>
            </a>
            <img
              src={thumbnailPetAdoption}
              className="w-4xl rounded-lg"
              alt="Thumbnail of Data security & privacy automation"
            />
          </div>
          <div className="w-350 opacity-90 group-hover:opacity-100 transition">
            <div className="text-turquoise-900 my-3 pl-2 leading-3 text-[13px] border-l-1 border-turquoise-900">
              Mar 2020
            </div>
            <h2 className="text-lg font-semibold leading-tight">
              Pet Adoption App
            </h2>
            <p className="text-turquoise-900 mt-3 text-[13px]">
              In India many pets are currently in shelters and pet-homes.
              Designed a mobile app that will help people looking for a new pet
              to connect with a right pet for them.
            </p>
            <h4 className="text-[13px] mt-3 font-medium">Responsibilities</h4>
            <p className="text-[13px]">
              Design Brief, Product Strategy, User Flow, UI/UX Design
            </p>
            <a
              href="https://www.dropbox.com/scl/fi/cvwbwioxa0r199o4v8am1/Case-Study-05-TakeMeHome-App.pdf?rlkey=idaqm9rsxkbhsnipzq2m7uthd&st=fbrd5dj4&dl=0"
              className="flex flex-row text-[13px] py-4 items-center font-bold text-[#3943B7] cursor-pointer transition hover:translate-x-1 hover:scale-102 hover:font-bold hover:underline"
              target="_blank"
            >
              Case Study
              <svg
                className="ml-2 h-3 w-3 font-semibold stroke-[#3943B7]"
                viewBox="0 0 16 16"
              >
                <path
                  d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5"
                  stroke-width="1.2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z"
                  stroke-width="1.2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectCard;
