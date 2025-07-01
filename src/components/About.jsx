import React from 'react'
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from "../components/Navbar";
import myPhoto from '../assets/myPhoto.png';
import thumbnailCBM from '../assets/thumbnailCBM.png';
import Consultant from '../assets/Consultant.svg';

const About = () => {

  return (
    <>
      <div className="fixed h-[74px] z-2 top-0 self-auto w-full bg-turquoise-500 opacity-0"
                x-bind:class="{'bg-turquoise-500 opacity-0': !scrolledFromTop, 'bg-turquoise-500 opacity-50': scrolledFromTop}" x-transition="true"></div>
      
      <div className="flex flex-col items-center relative transition-all duration-200 ease-in-out">
          <div className="text-white flex flex-col self-auto w-[1024px] h-auto static">
            <Link to="/" className="mx-24 mt-[12px] self-start relative z-101">
              <img src={myPhoto} className="w-12 h-12" alt="Srikumar's Photo" x-transition="true"/>
            </Link>
            
          <div className="-mt-15 w-full pt-32 flex flex-col items-center justify-center bg-turquoise-400">

            <div className="flex flex-row w-full px-16">
              <div className="flex flex-col size-[55%] mr-12">
                <div className="group flex flex-row p-8 rounded-lg overflow-hidden w-full text-turquoise-900 transition-colors duration-500 ease-in-out hover:bg-turquoise-300 cursor-default">
                    <div className="mr-8 relative flex flex-col items-center justify-center">
                      <img src={thumbnailCBM} className="w-4xl rounded-lg" alt="Thumbnail of RCM and CBM AI Solutions" />
                    </div>
                    <div className="w-350 opacity-90 group-hover:opacity-100 transition">
                      <h2 className="text-lg font-semibold leading-tight">Automate and Optimize RCM with CBM Integration</h2>
                      <p className="text-turquoise-900 mt-3 text-[13px]">
                        Maximo IBM's platform for managing the lifecycle, performance and maintenance of critical assets in industries like maintenance, energy oil & gas, transportation and more.
                      </p>
                      <h3 className="text-turquoise-900 mt-3 text-[13px]">It includes tools for:</h3>

                      <ul className="text-turquoise-900 mt-3 ml-4 text-[13px] list-disc">
                        <li>Work and maintenance management</li>
                        <li>Reliability (RCM) and condition-based monitoring (CBM)</li>
                        <li>Inventory and Procurement</li>
                        <li>Asset health insights and AI-driven predictions</li>
                      </ul>

                      <h4 className="text-[13px] mt-3 font-medium">Responsibilities</h4>
                      <p className="text-[13px]">Design Team Management, Design Strategy, User Research, Product Design, Support Design System</p>
                      <p className="text-[13px] py-4"><i>Design process available upon request</i></p>
                    </div>
                </div>

              </div>

              
              <div className="flex flex-col size-[45%] rounded-lg p-6 border border-[solid] border-turquoise-300 border-opacity-25">

                <div className="w-auto">
                  <h2 className="flex flex-row text-lg font-semibold leading-tight text-turquoise-900">
                    <svg className="h-5 w-5 mr-2 fill-turquoise-800 group-hover:fill-turquoise-500 transition" viewBox="0 0 16 16">
                      <path d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v8A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-8A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5m1.886 6.914L15 7.151V12.5a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5V7.15l6.614 1.764a1.5 1.5 0 0 0 .772 0M1.5 4h13a.5.5 0 0 1 .5.5v1.616L8.129 7.948a.5.5 0 0 1-.258 0L1 6.116V4.5a.5.5 0 0 1 .5-.5" />
                    </svg>
                    Work
                  </h2>
                  <div className="flex flex-row m-auto mt-6 items-center align-middle">
                    <div className="flex flex-row text-turquoise-900 text-[13px] font-medium m-auto mr-4 items-center align-middle">
                      <div className="mr-2 items-center align-middle">
                        <img src={Consultant} className="w-8 h-8" alt="Independent Consultant Work" />
                      </div>
                      <div className="text-[12px] w-[180px]">
                        <p className="font-semibold">Independent Consultant</p>
                        <p className="text-turquoise-800">UX Design Consultant</p>
                      </div>
                    </div>
                    <div className="text-turquoise-800 mt-1 leading-tight text-[11px] w-[250px] align-text-bottom text-right">Oct 2024 to Present</div>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
          <div className="w-full h-18 flex flex-col items-center justify-center text-[12px] text-turquoise-500 bg-turquoise-900 font">
            © 2025 srikumar.design
          </div>
        </div>
      </div>
    </>
  );
}

export default About