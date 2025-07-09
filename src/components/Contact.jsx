import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import myPhoto from "../assets/myPhoto.png";
import thumbnailCBM from "../assets/thumbnailCBM.png";
import Consultant from "../assets/Consultant.svg";

const Contact = () => {
  return (
    <>
          <div
            data-page-name="about"
            x-data="{ pageName: $root.dataset.pageName }" 
            x-init="$store.page.name = pageName" 
            className="fixed h-[74px] z-2 top-0 self-auto w-full bg-turquoise-500 opacity-0"
            x-bind:class="{'bg-turquoise-500 opacity-0': !scrolledFromTop, 'bg-turquoise-500 opacity-50': scrolledFromTop}"
            x-transition="true"
          ></div>
    
          <div className="relative flex flex-col items-center">
            <div className="static flex flex-col self-auto min-[240px]:w-full md:w-[1024px] h-auto text-white ">
              <Link to="/" className="min-[240px]:mx-[10%] md:mx-0 mt-[12px] self-start relative z-101">
                <img
                  src={myPhoto}
                  className="w-12 h-12"
                  alt="Srikumar's Photo"
                  x-transition="true"
                />
              </Link>
            </div>
          </div>
    </>
  );
};

export default Contact;
