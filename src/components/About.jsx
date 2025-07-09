import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import myPhoto from "../assets/myPhoto.png";
import thumbnailCBM from "../assets/thumbnailCBM.png";
import Consultant from "../assets/Consultant.svg";

const About = () => {
  return (
    <>
      <div
        data-page-name="about"
        x-data="{ pageName: $root.dataset.pageName }"
        x-init="$store.page.name = pageName"
        className="fixed h-[74px] z-2 top-0 self-auto w-full bg-turquoise-500 opacity-0 border-1"
      ></div>

      <div className="relative flex flex-col items-center">
        <div className="static flex flex-col self-auto min-[360px]:w-full md:w-full lg:w-[1024px] h-auto text-white">
          <Link
            to="/"
            className="min-[360px]:ml-[46px] sm:ml-[90px] lg:ml-[6px] mt-[12px] self-start relative z-101"
          >
            <img
              src={myPhoto}
              className="w-12 h-12"
              alt="Srikumar's Photo"
              x-transition="true"
            />
          </Link>
        </div>
      </div>

      <div className="body-wrapper h-full">
        <div className="subpage-body-container">
          <div className="sub-content-wrapper h-full transition-all duration-300 ease-in-out">
            <Link to="/" className="group sub-backhome-link">
              <svg
                xmlns="http://www.w3.org/2000/svg"
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
            <p className="h-full text-turquoise-900 font-medium size-3.5 w-full py-18 text-center justify-center">
              Coming soon...
            </p>
          </div>

          <div className="footer">© 2025 srikumar.design</div>
        </div>
      </div>
    </>
  );
};

export default About;
