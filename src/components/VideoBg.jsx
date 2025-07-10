import React from "react";
import videoBg from '../assets/videoBg.mp4';
import useShouldHideVideo from "./useShouldHideVideo";

const VideoBg = () => {
    //const shouldHideVideo = useShouldHideVideo();
  return (
    
    <>
      <div className="justify-center self-auto items-center w-full min-h-screen mt-0 flex absolute bg-[linear-gradient(to_bottom,_rgba(0,_192,_199,_0.5),_rgba(0,_192,_199,_0.5))]">
        <video
          src={videoBg}
          autoPlay
          loop
          muted
          className="
            min-[360px]:invisible sm:visible -z-10 object-cover bg-[50%] bg-cover w-full h-full m-auto absolute"
        ></video>
      </div>
      <div
        className="fixed h-[74px] z-2 top-0 self-auto w-full bg-turquoise-500 opacity-0"
        x-bind:class="{'bg-turquoise-500 opacity-0': !scrolledFromTop, 'bg-turquoise-500 opacity-50': scrolledFromTop}"
        x-transiton
      ></div>
    </>
  )};

export default VideoBg;
