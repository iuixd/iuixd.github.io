import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import myPhoto from "../assets/myPhoto.webp";
import contactBG from "../assets/contact-bg.webp";
import Consultant from "../assets/Consultant.svg";
import Reveal from "./Reveal";

const Contact = () => {
  return (
    <>
      <div
        data-page-name="contact"
        x-data="{ pageName: $root.dataset.pageName }"
        x-init="$store.page.name = pageName"
        className="fixed h-[74px] z-2 top-0 self-auto w-full bg-turquoise-500 opacity-0 border-1"
      ></div>

      <div className="relative flex flex-col max-[360px]:items-start min-[360px]:items-center">
        <div className="static flex flex-col self-auto min-[360px]:w-full md:w-full lg:w-[1024px] h-auto text-white">
          <Link
            to="/"
            className="max-[550px]:ml-[50px] sm:ml-[90px] lg:ml-[6px] mt-[12px] self-start relative z-101"
          >
            <img src={myPhoto} className="w-12 h-12" alt="Srikumar's Photo" />
          </Link>
        </div>
      </div>

      <div className="body-wrapper">
        <div className="subpage-body-container">
          <div className="sub-content-wrapper h-[1030px] transition-all duration-300 ease-in-out">
            <Link to="/" className="group sub-backhome-link cursor-pointer">
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
            <section className="text-turquoise-900 font-medium size-3.5 w-full h-fit px-[20%] max-[540px]:px-[12%] max-[540px]:mt-[30px] pb-18">
              <div className="relative w-fit h-fit ">
                <div className="z-2 w-fit h-fit">
                  <Reveal>
                    <h1 className="mb-16 font-extrabold text-7xl max-[540px]:text-5xl text-white">
                      Contact
                    </h1>
                  </Reveal>

                  <Reveal>
                    <div className="relative w-100 max-[540px]:w-72 h-116 max-[540px]:h-84 bg-[url('../assets/contact-bg.webp')] bg-no-repeat bg-cover bg-center rounded-tr-[40px] ">
                      <h2 className="absolute left-30 max-[540px]:left-23 top-8 max-[540px]:top-4 z-2 w-fit mb-8 font-bold text-4xl max-[540px]:text-2xl text-turquoise-900">
                        Let's create
                        <br />
                        amazing stuff
                        <br />
                        together!
                      </h2>
                    </div>
                  </Reveal>
                </div>

                <div className="absolute -left-[24px] top-80 max-[540px]:top-60 z-4 w-[426px] max-[540px]:w-[312px] h-fit pl-[26px] pt-[300px] max-[540px]:pt-[230px] rounded-bl-[40px] border-6 border-turquoise-900">
                  <Reveal>
                    <h3 className="w-full font-semibold text-[20px] max-[540px]:text-[16px] text-turquoise-900">
                      <span className="w-full text-[32px] max-[540px]:text-[24px]">👋</span> Have a project in mind?
                    </h3>
                  </Reveal>
                  <Reveal>
                    <p className="w-[300px] max-[540px]:w-[200px] ml-13 max-[540px]:ml-[38px] my-3 text-[14px] max-[540px]:text-[12px] text-turquoise-900">
                      You can reach out via email or WhatsApp, and I'll respond
                      within 48 hours.
                    </p>
                  </Reveal>
                  <Reveal>
                    <ul className="text-violet-500 ml-13 max-[540px]:ml-[38px] mb-8 text-[14px] max-[540px]:text-[12px]">
                      <li className="py-1">
                        <a
                          href="mailto:srikumar.design@gmail.com"
                          className="flex flex-row gap-4 w-fit items-center cursor-pointer underline hover:no-underline"
                        >
                          <svg
                            width="16"
                            height="16"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                            className="w-4 h-4 fill-turquoise-900"
                          >
                            <path d="M8.941.435a2 2 0 0 0-1.882 0l-6 3.2A2 2 0 0 0 0 5.4v.314l6.709 3.932L8 8.928l1.291.718L16 5.714V5.4a2 2 0 0 0-1.059-1.765zM16 6.873l-5.693 3.337L16 13.372v-6.5Zm-.059 7.611L8 10.072.059 14.484A2 2 0 0 0 2 16h12a2 2 0 0 0 1.941-1.516M0 13.373l5.693-3.163L0 6.873z" />
                          </svg>
                          <span className="w-fit">
                            srikumar.design@gmail.com
                          </span>
                        </a>
                      </li>
                      <li className="py-1">
                        <a
                          href="https://api.whatsapp.com/send/?phone=918605573777&text=Hello+Srikumar%2C+Let%27s+connect&type=phone_number&app_absent=0"
                          className="flex flex-row gap-4 w-fit items-center cursor-pointer underline hover:no-underline"
                        >
                          <svg
                            width="16"
                            height="16"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                            className="w-4 h-4 fill-turquoise-900"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"
                            />
                          </svg>
                          <span className="w-fit">+(91) 86055 73777</span>
                        </a>
                      </li>
                    </ul>
                  </Reveal>
                </div>
              </div>
            </section>
          </div>

          <div className="footer">© 2025 srikumar.design</div>
        </div>
      </div>
    </>
  );
};

export default Contact;
