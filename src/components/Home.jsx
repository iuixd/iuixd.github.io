import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import videoBg from '../assets/videoBg.mp4';
import myPhoto from '../assets/myPhoto.png';
import certBadges from '../assets/certBadges.png';
import thumbnailCBM from '../assets/thumbnailCBM.png';
import thumbnailWealthMgmt from '../assets/thumbnailWealthMgmt.png';
import thumbnailLumenAI from '../assets/thumbnailLumenAI.png';
import LumenaiLogo from '../assets/LumenaiLogo.gif';
import thumbnailDataPrivacy from '../assets/thumbnailDataPrivacy.png';
import thumbnailPetAdoption from '../assets/thumbnailPetAdoption.png';
import thumbnailZeroTrust from '../assets/thumbnailZeroTrust.png';
import thumbnailUnifiedDashboard from '../assets/thumbnailUnifiedDashboard.png';
import Consultant from '../assets/Consultant.svg';
import IBMLogo from '../assets/IBMLogo.svg';
import targetLogo from '../assets/targetLogo.svg';
import imLogo from '../assets/imLogo.svg';
import ctLogo from '../assets/ctLogo.svg';
import qhLogo from '../assets/qhLogo.svg';
import dbsLogo from '../assets/dbsLogo.svg';
import fireeyeLogo from '../assets/fireeyeLogo.svg';
import mcafeeLogo from '../assets/mcafeeLogo.svg';
import aztecLogo from '../assets/aztecLogo.svg';
import Alpine from 'alpinejs'
 
window.Alpine = Alpine;
 
Alpine.start();

function Home() {
  const navigate = useNavigate();

    return (
        <>
        <div className="justify-center self-auto items-center w-full min-h-screen mt-0 flex absolute bg-[linear-gradient(to_bottom,_rgba(0,_192,_199,_0.5),_rgba(0,_192,_199,_0.5))]">
          <video src={videoBg} autoPlay loop muted className="-z-10 object-cover bg-[50%] bg-cover w-full h-full m-auto absolute"></video>

          </div>
          <div className="fixed h-[74px] z-2 top-0 self-auto w-full bg-turquoise-500 opacity-0"
                x-bind:class="{'bg-turquoise-500 opacity-0': !scrolledFromTop, 'bg-turquoise-500 opacity-50': scrolledFromTop}" x-transiton></div>
          
      <div className="flex flex-col items-center relative transition-all duration-200 ease-in-out">
          
          <div className="text-white flex flex-col self-auto w-[1024px] pt-60 h-auto static">
            <a href="#" className="mx-24 self-start relative z-100 transition-all duration-200 ease-in-out transition duration-600"
            x-bind:class="{'relative': !scrolledFromTop, 'sticky top-3.5': scrolledFromTop}" x-transition>
              <img src={myPhoto} className="w-24 h-24" 
              x-bind:class="{'w-24 h-24': !scrolledFromTop, 'w-12 h-12': scrolledFromTop}"
              alt="Srikumar's Photo" x-transition/>
            </a>
            <div className="mx-24 w-[810px] font-bold font-bold text-[3.2em] leading-[1.1em] px-[0] py-4 [text-shadow:0_0_1px_#151c1cf0]">Product designer, design leader and amateur developer<span className="text-turquoise-500">.</span></div>
            <div className="mx-24 w-[810px] text-[1.1em] px-[0] py-4 [text-shadow:0_0_1px_#151c1cf0]">I'm Srikumar, an experienced designer based in Bangalore, India. I am passionate about crafting user-centric and human-AI experiences, and I specialize in bringing bold ideas to life from concept to execution.</div>
            <div className="mx-24 mt-6 flex gap-6">
              <a className="group -m-1 p-3 rounded-[100px] hover:bg-turquoise-800 transition" aria-label="Follow on X" href="#">
                <svg viewBox="0 0 16 16" aria-hidden="true" className="h-5 w-5 fill-white">
                  <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"/>
                </svg>
              </a>
              <a className="group -m-1 p-3 rounded-[100px] hover:bg-turquoise-800 transition" aria-label="Follow on Instagram" href="#">
                <svg viewBox="0 0 16 16" aria-hidden="true" className="h-5 w-5 fill-white">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
                </svg>
              </a>
              <a className="group -m-1 p-3 rounded-[100px] hover:bg-turquoise-800 transition" aria-label="Follow on GitHub" href="https://iuixd.github.io/srikumar-portfolio" target="_blank">
                <svg viewBox="0 0 16 16" aria-hidden="true" className="h-5 w-5 fill-white">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/>
              </svg>
              </a>
              <a className="group -m-1 p-3 rounded-[100px] hover:bg-turquoise-800 transition" aria-label="Follow on LinkedIn" href="https://www.linkedin.com/in/srikumarkk" target="_blank">
                <svg viewBox="0 0 16 16" aria-hidden="true" className="h-5 w-5 fill-white">
                  <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/>
                </svg>
              </a>
            </div>
          <div className="mt-20 w-full py-16 flex flex-col items-center justify-center bg-turquoise-400">
            <div className="mb-14">
              <img src={certBadges} className="w-2xl" alt="Srikumar's Certificates" />
            </div>

            <div className="flex flex-row w-full px-16">
              <div className="flex flex-col size-[55%] mr-12">

                <div className="group flex flex-row p-8 rounded-lg overflow-hidden w-full text-turquoise-900 transition-colors duration-500 ease-in-out hover:bg-turquoise-300 cursor-default">
                    <div className="mr-8 relative flex flex-col items-center justify-center">
                      <a href="https://www.youtube.com/watch?v=63SdhdrYhao" className="absolute w-16 h-16 rounded-full bg-turquoise-300 opacity-50 hover:opacity-100 hover:w-17 hover:h-17  transition flex flex-col items-center justify-center cursor-pointer" target="_blank">
                        <svg className="ml-1 h-12 w-12 hover:w-13 hover:h-13 fill-turquoise-900" viewBox="0 0 16 16">
                          <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393" />
                        </svg>
                      </a>
                      <img src={thumbnailWealthMgmt} className="w-4xl rounded-lg" alt="Thumbnail of Smart Wealth, Smarter Guidance AI Solutions" />
                    </div>
                    <div className="w-350 opacity-90 group-hover:opacity-100 transition">
                      <div className="text-turquoise-900 my-3 pl-2 leading-3 text-[13px] border-l-1 border-turquoise-900">
                        May 2025
                      </div>
                      <h2 className="text-lg font-semibold leading-tight">Smart Wealth, Smarter Guidance AI Solution</h2>
                      <p className="text-turquoise-900 mt-3 text-[13px]">
                        Users often find personal finance tools overwhelming, fragmented, and impersonal. They seek proactive, transparent, and easy-to-act-on insights to help them make smarter financial decisions with confidence.
                      </p>
                      <p className="text-turquoise-900 mt-3 text-[13px]">
                        The goal is to support wealth customers in making smarter financial decisions by combining AI-driven insights with human advisor collaboration.
                      </p>
                      <h3 className="text-turquoise-900 mt-3 text-[13px]">Scope:</h3>

                      <ul className="text-turquoise-900 mt-3 ml-4 text-[13px] list-disc">
                        <li>AI Assistant integration</li>
                        <li>Daily/weekly nudges</li>
                        <li>Insight transparency & user feedback</li>
                        <li>Actionable recommendations</li>
                      </ul>

                      <h4 className="text-[13px] mt-3 font-medium">Responsibilities</h4>
                      <p className="text-[13px]">Design Strategy, User Research, Product Design, Design System</p>
                      <a href="https://www.dropbox.com/scl/fi/3syi8lbwbmvndim3g541i/Case-Study-01-Wealth-App-AI-Driven-Experience.pdf?rlkey=f9n95i0p5qsgip12221sefwaz&st=wvd0dudl&dl=0" className="flex flex-row text-[13px] py-4 items-center underline cursor-pointer transition hover:translate-x-1 hover:scale-102 hover:font-bold" target="_blank">
                        Read more 
                        <svg className="ml-2 h-3 w-3 font-semibold stroke-turquoise-800" viewBox="0 0 16 16">
                          <path d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </a>
                    </div>
                </div>

                <div className="group flex flex-row p-8 rounded-lg overflow-hidden w-full text-turquoise-900 transition-colors duration-500 ease-in-out hover:bg-turquoise-300 cursor-default">
                    <div className="mr-8 relative flex flex-col items-center justify-center">
                      <img src={thumbnailCBM} className="w-4xl rounded-lg" alt="Thumbnail of RCM and CBM AI Solutions" />
                    </div>
                    <div className="w-350 opacity-90 group-hover:opacity-100 transition">
                      <div className="text-turquoise-900 my-3 pl-2 leading-3 text-[13px] border-l-1 border-turquoise-900">
                        Oct 2024
                      </div>
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
                      <a href="https://www.dropbox.com/scl/fi/6fjmboffcqennvyzhhi3t/Case-Study-02-Automate-and-Optimize-RCM-with-CBM-Integration.pdf?rlkey=gdx7yozogic5x2gq3eockvhdi&st=9u6c6ym7&dl=0" className="flex flex-row text-[13px] py-4 items-center underline cursor-pointer transition hover:translate-x-1 hover:scale-102 hover:font-bold" target="_blank">
                        Read more 
                        <svg className="ml-2 h-3 w-3 font-semibold stroke-turquoise-800" viewBox="0 0 16 16">
                          <path d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </a>
                    </div>
                </div>

                <div className="group flex flex-row p-8 rounded-lg overflow-hidden w-full text-turquoise-900 transition-colors duration-500 ease-in-out hover:bg-turquoise-300 cursor-default">
                    <div className="mr-8 relative flex flex-col items-center justify-center">
                      <img src={LumenaiLogo} className="w-4xl rounded-lg" alt="Thumbnail of Lumen AI Logo Animation" />
                    </div>
                    <div className="w-350 opacity-90 group-hover:opacity-100 transition">
                      <div className="text-turquoise-900 my-3 pl-2 leading-3 text-[13px] border-l-1 border-turquoise-900">
                        June 2023
                      </div>
                      <h2 className="text-lg font-semibold leading-tight">Logo Design</h2>
                      <p className="text-turquoise-900 mt-3 text-[13px]">
                        Lumen AI, an enterprise-grade AI/ML data extraction tool, is represented through a modern logo symbolizing innovation, precision, and automation.
                      </p>
                      <p className="text-turquoise-900 mt-3 text-[13px]">
                        A radiant light motif reflects its power to illuminate insights from complex data, with gradient tones conveying depth and intelligence.
                      </p>
                      <h4 className="text-[13px] mt-3 font-medium">Responsibilities</h4>
                      <p className="text-[13px]">Logo Design, Branding, Visual Communication, Animation, Design Collaboration</p>
                      <p className="text-[13px] py-4"><i>Design process available upon request</i></p>
                    </div>
                </div>

                <div className="group flex flex-row p-8 rounded-lg overflow-hidden w-full text-turquoise-900 transition-colors duration-500 ease-in-out hover:bg-turquoise-300 cursor-default">
                    <div className="mr-8 relative flex flex-col items-center justify-center">
                      <a href="https://www.youtube.com/watch?v=cMCYiHNBtq4" className="absolute w-16 h-16 rounded-full bg-turquoise-300 opacity-50 hover:opacity-100 hover:w-17 hover:h-17 transition flex flex-col items-center justify-center cursor-pointer" target="_blank">
                        <svg className="ml-1 h-12 w-12 hover:w-13 hover:h-13 fill-turquoise-900" viewBox="0 0 16 16">
                          <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393" />
                        </svg>
                      </a>
                      <img src={thumbnailLumenAI} className="w-4xl rounded-lg" alt="Thumbnail of Lumen AI Solutions" />
                    </div>
                    <div className="w-350 opacity-90 group-hover:opacity-100 transition">
                      <div className="text-turquoise-900 my-3 pl-2 leading-3 text-[13px] border-l-1 border-turquoise-900">
                        Dec 2023
                      </div>
                      <h2 className="text-lg font-semibold leading-tight">Lumen AI Solutions</h2>
                      <p className="text-turquoise-900 mt-3 text-[13px]">
                        Lumen AI simplifies document workflows with an intuitive interface powered by AI. Its features such as data extraction, validation and summarization help users process documents faster with accuracy and ease.
                      </p>
                      <h4 className="text-[13px] mt-3 font-medium">Responsibilities</h4>
                      <p className="text-[13px]">User Research, Product Design, Design System</p>
                      <p className="text-[13px] py-4"><i>Design process available upon request</i></p>
                    </div>
                </div>

                <div className="group flex flex-row p-8 rounded-lg overflow-hidden w-full text-turquoise-900 transition-colors duration-500 ease-in-out hover:bg-turquoise-300 cursor-default">
                    <div className="mr-8 relative flex flex-col items-center justify-center">
                      <a href="https://www.youtube.com/watch?v=UwCw4N5_6SI" className="absolute w-16 h-16 rounded-full bg-turquoise-300 opacity-50 hover:opacity-100 hover:w-17 hover:h-17  transition flex flex-col items-center justify-center cursor-pointer" target="_blank">
                        <svg className="ml-1 h-12 w-12 hover:w-13 hover:h-13 fill-turquoise-900" viewBox="0 0 16 16">
                          <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393" />
                        </svg>
                      </a>
                      <img src={thumbnailDataPrivacy} className="w-4xl rounded-lg" alt="Thumbnail of Data security & privacy automation" />
                    </div>
                    <div className="w-350 opacity-90 group-hover:opacity-100 transition">
                      <div className="text-turquoise-900 my-3 pl-2 leading-3 text-[13px] border-l-1 border-turquoise-900">
                        Jan 2021
                      </div>
                      <h2 className="text-lg font-semibold leading-tight">Data security & privacy automation</h2>
                      <p className="text-turquoise-900 mt-3 text-[13px]">
                        Help a data privacy and protection team in getting full visibility into data privacy risks and providing full control on PII security and risk remediation.
                      </p>
                      <h4 className="text-[13px] mt-3 font-medium">Responsibilities</h4>
                      <p className="text-[13px]">User Research, Product Design, Design System</p>
                      <a href="https://www.dropbox.com/scl/fi/gy74x7sxabsu9ok8mlgkl/Case-Study-03-Automated-Data-Privacy-Platform.pdf?rlkey=c2vaet98myxpxrcg2vkines99&st=c60i4iy7&dl=0" className="flex flex-row text-[13px] py-4 items-center underline cursor-pointer transition hover:translate-x-1 hover:scale-102 hover:font-bold" target="_blank">
                        Read more 
                        <svg className="ml-2 h-3 w-3 font-semibold stroke-turquoise-800" viewBox="0 0 16 16">
                          <path d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </a>
                    </div>
                </div>

                <div className="group flex flex-row p-8 rounded-lg overflow-hidden w-full text-turquoise-900 transition-colors duration-500 ease-in-out hover:bg-turquoise-300 cursor-default">
                    <div className="mr-8 relative flex flex-col items-center justify-center">
                      <img src={thumbnailUnifiedDashboard} className="w-4xl rounded-lg" alt="Thumbnail of Unified Dashboard" />
                    </div>
                    <div className="w-350 opacity-90 group-hover:opacity-100 transition">
                      <div className="text-turquoise-900 my-3 pl-2 leading-3 text-[13px] border-l-1 border-turquoise-900">
                        Mar 2020
                      </div>
                      <h2 className="text-lg font-semibold leading-tight">Unified Dashboard</h2>
                      <h3 className="text-[13px] font-medium text-turquoise-900 mt-1 leading-tight">with actionable security insights</h3>
                      <p className="text-turquoise-900 mt-3 text-[13px]">
                        Designed dashboard to provide actionable security insights of the application groups, assets and network access for admin users to act-on.
                      </p>
                      <h4 className="text-[13px] mt-3 font-medium">Responsibilities</h4>
                      <p className="text-[13px]">Design Thinking, Product Strategy, UX/UI Design, Data Analysis, Led Design Team</p>
                      <a href="https://www.dropbox.com/scl/fi/8exq440g7csym7ceiomna/Case-Study-05-ColorToken-XShield-Dashboard.pdf?rlkey=x114gvby1eda4wg2mhdj935hm&st=hcpp4usr&dl=0" className="flex flex-row text-[13px] py-4 items-center underline cursor-pointer transition hover:translate-x-1 hover:scale-102 hover:font-bold" target="_blank">
                        Read more 
                        <svg className="ml-2 h-3 w-3 font-semibold stroke-turquoise-800" viewBox="0 0 16 16">
                          <path d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </a>
                    </div>
                </div>

                <div className="group flex flex-row p-8 rounded-lg overflow-hidden w-full text-turquoise-900 transition-colors duration-500 ease-in-out hover:bg-turquoise-300 cursor-default">
                    <div className="mr-8 relative flex flex-col items-center justify-center">
                      <a href="https://www.youtube.com/watch?v=uW1a5iQ7u1Q&t=1s" className="absolute w-16 h-16 rounded-full bg-turquoise-300 opacity-50 hover:opacity-100  hover:w-17 hover:h-17 transition flex flex-col items-center justify-center cursor-pointer" target="_blank">
                        <svg className="ml-1 h-12 w-12 hover:w-13 hover:h-13 fill-turquoise-900" viewBox="0 0 16 16">
                          <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393" />
                        </svg>
                      </a>
                      <img src={thumbnailZeroTrust} className="w-4xl rounded-lg" alt="Thumbnail of Zero-trust Network Security" />
                    </div>
                    <div className="w-350 opacity-90 group-hover:opacity-100 transition">
                      <div className="text-turquoise-900 my-3 pl-2 leading-3 text-[13px] border-l-1 border-turquoise-900">
                        Dec 2018
                      </div>
                      <h2 className="text-lg font-semibold leading-tight">Zero-trust Network Security</h2>
                      <p className="text-turquoise-900 mt-3 text-[13px]">
                        Redesign visibility of workload protection, applications flows with all network access to improve security monitoring and operational excellence.
                      </p>
                      <h4 className="text-[13px] mt-3 font-medium">Responsibilities</h4>
                      <p className="text-[13px]">Design Thinking, Product Strategy, UX/UI Design, Data Analysis, Led Design Team</p>
                      <a href="https://www.dropbox.com/scl/fi/pnqrjbkm0zv0f8hfeew1j/Case-Study-04-Zero-trust-Network-Security-Solution.pdf?rlkey=v5s0wbgwphxtvehyahvlymrrf&st=ztiylinz&dl=0" className="flex flex-row text-[13px] py-4 items-center underline cursor-pointer transition hover:translate-x-1 hover:scale-102 hover:font-bold" target="_blank">
                        Read more 
                        <svg className="ml-2 h-3 w-3 font-semibold stroke-turquoise-800" viewBox="0 0 16 16">
                          <path d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </a>
                    </div>
                </div>

                <div className="group flex flex-row p-8 rounded-lg overflow-hidden w-full text-turquoise-900 transition-colors duration-500 ease-in-out hover:bg-turquoise-300 cursor-default">
                    <div className="mr-8 relative flex flex-col items-center justify-center">
                      <a href="https://www.youtube.com/watch?v=rYPZIdsFbAc&t=1s" className="absolute w-16 h-16 rounded-full bg-turquoise-300 opacity-50 hover:opacity-100  hover:w-17 hover:h-17 transition flex flex-col items-center justify-center cursor-pointer" target="_blank">
                        <svg className="ml-1 h-12 w-12 hover:w-13 hover:h-13 fill-turquoise-900" viewBox="0 0 16 16">
                          <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393" />
                        </svg>
                      </a>
                      <img src={thumbnailPetAdoption} className="w-4xl rounded-lg" alt="Thumbnail of Data security & privacy automation" />
                    </div>
                    <div className="w-350 opacity-90 group-hover:opacity-100 transition">
                      <div className="text-turquoise-900 my-3 pl-2 leading-3 text-[13px] border-l-1 border-turquoise-900">
                        Mar 2020
                      </div>
                      <h2 className="text-lg font-semibold leading-tight">Pet Adoption App</h2>
                      <p className="text-turquoise-900 mt-3 text-[13px]">
                        In India many pets are currently in shelters and pet-homes. Designed a mobile app that will help people looking for a new pet to connect with a right pet for them.
                      </p>
                      <h4 className="text-[13px] mt-3 font-medium">Responsibilities</h4>
                      <p className="text-[13px]">Design Brief, Product Strategy, User Flow, UI/UX Design</p>
                      <a href="https://www.dropbox.com/scl/fi/cvwbwioxa0r199o4v8am1/Case-Study-05-TakeMeHome-App.pdf?rlkey=idaqm9rsxkbhsnipzq2m7uthd&st=fbrd5dj4&dl=0" className="flex flex-row text-[13px] py-4 items-center underline cursor-pointer transition hover:translate-x-1 hover:scale-102 hover:font-bold" target="_blank">
                        Read more 
                        <svg className="ml-2 h-3 w-3 font-semibold stroke-turquoise-800" viewBox="0 0 16 16">
                          <path d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </a>
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
                  
                  <div className="flex flex-row m-auto mt-6 items-center align-middle">
                    <div className="flex flex-row text-turquoise-900 text-[13px] font-medium m-auto mr-4 items-center align-middle">
                      <div className="mr-2 items-center align-middle">
                        <img src={IBMLogo} className="w-8 h-8" alt="IBM Logo" />
                      </div>
                      <div className="text-[12px] w-[180px]">
                        <p className="font-semibold">IBM India Pvt Ltd</p>
                        <p className="text-turquoise-800">Senior Design Manager</p>
                      </div>
                    </div>
                    <div className="text-turquoise-800 mt-1 leading-tight text-[11px] w-[200px] align-text-bottom text-right">Apr 2024 to Oct 2024</div>
                  </div>
                  
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
                    <div className="text-turquoise-800 mt-1 leading-tight text-[11px] w-[250px] align-text-bottom text-right">May 2023 to Mar 2024</div>
                  </div>
                  
                  <div className="flex flex-row m-auto mt-6 items-center align-middle">
                    <div className="flex flex-row text-turquoise-900 text-[13px] font-medium m-auto mr-4 items-center align-middle">
                      <div className="mr-2 items-center align-middle">
                        <img src={targetLogo} className="w-8 h-7" alt="Target Logo" />
                      </div>
                      <div className="text-[12px] w-[180px]">
                        <p className="font-semibold">Target Corp</p>
                        <p className="text-turquoise-800">Senior UX Manager</p>
                      </div>
                    </div>
                    <div className="text-turquoise-800 mt-1 leading-tight text-[11px] w-[200px] align-text-bottom text-right">Aug 2022 to Apr 2023</div>
                  </div>
                  
                  <div className="flex flex-row m-auto mt-6 items-center align-middle">
                    <div className="flex flex-row text-turquoise-900 text-[13px] font-medium m-auto mr-4 items-center align-middle">
                      <div className="mr-2 items-center align-middle">
                        <img src={imLogo} className="w-8 h-7" alt="Innominds Logo" />
                      </div>
                      <div className="text-[12px] w-[200px]">
                        <p className="font-semibold">Innominds Software Pvt Ltd</p>
                        <p className="text-turquoise-800">Senior UX Manager</p>
                      </div>
                    </div>
                    <div className="text-turquoise-800 mt-1 leading-tight text-[11px] w-[200px] align-text-bottom text-right">Sep 2021 to Jul 2022</div>
                  </div>
                  
                  <div className="flex flex-row m-auto mt-6 items-center align-middle">
                    <div className="flex flex-row text-turquoise-900 text-[13px] font-medium m-auto mr-4 items-center align-middle">
                      <div className="mr-2 items-center align-middle">
                        <img src={Consultant} className="w-8 h-8" alt="Independent Consultant Work" />
                      </div>
                      <div className="text-[12px] w-[180px]">
                        <p className="font-semibold">Stealth Startups</p>
                        <p className="text-turquoise-800">UX Design Consultant</p>
                      </div>
                    </div>
                    <div className="text-turquoise-800 mt-1 leading-tight text-[11px] w-[250px] align-text-bottom text-right">Mar 2020 to Sep 2021</div>
                  </div>
                  
                  <div className="flex flex-row m-auto mt-6 items-center align-middle">
                    <div className="flex flex-row text-turquoise-900 text-[13px] font-medium m-auto mr-4 items-center align-middle">
                      <div className="mr-2 items-center align-middle">
                        <img src={ctLogo} className="w-8 h-8" alt="ColorTokens Logo" />
                      </div>
                      <div className="text-[12px] w-[180px]">
                        <p className="font-semibold">ColorTokens</p>
                        <p className="text-turquoise-800">Senior UX Architect </p>
                      </div>
                    </div>
                    <div className="text-turquoise-800 mt-1 leading-tight text-[11px] w-[250px] align-text-bottom text-right">Mar 2018 to Mar 2020</div>
                  </div>
                  
                  <div className="flex flex-row m-auto mt-6 items-center align-middle">
                    <div className="flex flex-row text-turquoise-900 text-[13px] font-medium m-auto mr-4 items-center align-middle">
                      <div className="mr-2 items-center align-middle">
                        <img src={qhLogo} className="w-8 h-8" alt="ColorTokens Logo" />
                      </div>
                      <div className="text-[12px] w-[180px]">
                        <p className="font-semibold">Quick Heal Technologies</p>
                        <p className="text-turquoise-800">Senior UX Manager</p>
                      </div>
                    </div>
                    <div className="text-turquoise-800 mt-1 leading-tight text-[11px] w-[250px] align-text-bottom text-right">Sep 2016 to Mar 2018</div>
                  </div>
                  
                  <div className="flex flex-row m-auto mt-6 items-center align-middle">
                    <div className="flex flex-row text-turquoise-900 text-[13px] font-medium m-auto mr-4 items-center align-middle">
                      <div className="mr-2 items-center align-middle">
                        <img src={dbsLogo} className="w-8 h-8" alt="ColorTokens Logo" />
                      </div>
                      <div className="text-[12px] w-[180px]">
                        <p className="font-semibold">DBS Bank Singapore</p>
                        <p className="text-turquoise-800">UI UX Tech Lead Consultant</p>
                      </div>
                    </div>
                    <div className="text-turquoise-800 mt-1 leading-tight text-[11px] w-[250px] align-text-bottom text-right">Aug 2015 to Aug 2016</div>
                  </div>
                  
                  <div className="flex flex-row m-auto mt-6 items-center align-middle">
                    <div className="flex flex-row text-turquoise-900 text-[13px] font-medium m-auto mr-4 items-center align-middle">
                      <div className="mr-2 items-center align-middle">
                        <img src={fireeyeLogo} className="w-8 h-8" alt="ColorTokens Logo" />
                      </div>
                      <div className="text-[12px] w-[180px]">
                        <p className="font-semibold">FireEye</p>
                        <p className="text-turquoise-800">UI UX Manager </p>
                      </div>
                    </div>
                    <div className="text-turquoise-800 mt-1 leading-tight text-[11px] w-[250px] align-text-bottom text-right">Jan 2015 to May 2015</div>
                  </div>
                  
                  <div className="flex flex-row m-auto mt-6 items-center align-middle">
                    <div className="flex flex-row text-turquoise-900 text-[13px] font-medium m-auto mr-4 items-center align-middle">
                      <div className="mr-2 items-center align-middle">
                        <img src={mcafeeLogo} className="w-8 h-8" alt="ColorTokens Logo" />
                      </div>
                      <div className="text-[12px] w-[180px]">
                        <p className="font-semibold">McAfee</p>
                        <p className="text-turquoise-800">UI UX Manager </p>
                      </div>
                    </div>
                    <div className="text-turquoise-800 mt-1 leading-tight text-[11px] w-[250px] align-text-bottom text-right">May 2006 to Jan 2015</div>
                  </div>
                  
                  <div className="flex flex-row m-auto mt-6 items-center align-middle">
                    <div className="flex flex-row text-turquoise-900 text-[13px] font-medium m-auto mr-4 items-center align-middle">
                      <div className="mr-2 items-center align-middle">
                        <img src={aztecLogo} className="w-8 h-8" alt="ColorTokens Logo" />
                      </div>
                      <div className="text-[12px] w-[180px]">
                        <p className="font-semibold">AZTEC Software</p>
                        <p className="text-turquoise-800">Senior UI Specialist</p>
                      </div>
                    </div>
                    <div className="text-turquoise-800 mt-1 leading-tight text-[11px] w-[250px] align-text-bottom text-right">Aug 2005 to May 2006</div>
                  </div>
                  
                  <a className="inline-flex items-center gap-2 justify-center rounded-md py-2 px-3 text-sm outline-offset-2 transition active:transition-none bg-turquoise-200 font-medium text-turquoise-800  hover:text-turquoise-900 hover:bg-turquoise-100 group mt-6 w-full" href="https://www.dropbox.com/scl/fi/nkq0e28tzyotnzwdglgpg/Srikumar-Krishnan-Kutty-Resume.docx?rlkey=ek3mdehpjyx2jyyj3lvjgzqyk&e=1&st=dadeqmjx&dl=0" target="_blank">Download CV<svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="h-4 w-4 stroke-turquoise-700 transition group-hover:stroke-turquoise-900"><path d="M4.75 8.75 8 12.25m0 0 3.25-3.5M8 12.25v-8.5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></a>
                  
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

export default Home;

