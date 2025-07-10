import React from "react";
import videoBg from '../assets/videoBg.mp4';
import useShouldHideVideo from "./useShouldHideVideo";

const VideoBg = () => {
    //const shouldHideVideo = useShouldHideVideo();
  return (
    
    <>
      <div className="video-bg-wrapper">
        <video
          src={videoBg}
          autoPlay
          loop
          muted
          className="video-bg"
        ></video>
      </div>
      <div
        className="nav-scrolltop-bar"
        x-bind:class="{'bg-turquoise-500 opacity-0': !scrolledFromTop, 'bg-turquoise-500 opacity-50': scrolledFromTop}"
      ></div>
    </>
  )};

export default VideoBg;
