// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef, useState } from 'react';
import videoBg from '../assets/videoBg.webm';
// eslint-disable-next-line no-unused-vars
import useShouldHideVideo from "./useShouldHideVideo";

const VideoBg = () => {
    //const shouldHideVideo = useShouldHideVideo();
      
    // eslint-disable-next-line no-unused-vars
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
      // eslint-disable-next-line no-unused-vars
      const [screenHeight, setScreenHeight] = useState(window.innerHeight);
      // eslint-disable-next-line no-unused-vars
      const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // initialize correctly
    
      useEffect(() => {
        const handleResize = () => {
          const width = window.innerWidth;
          const height = window.innerHeight;
    
          setScreenWidth(width);
          setScreenHeight(height);
          setIsMobile(width <= 768); 
        };
    
        // Initial check (in case resize hasn't occurred)
        handleResize();
    
        window.addEventListener('resize', handleResize);
    
        return () => window.removeEventListener('resize', handleResize);
      }, []);

  return (
    <>
      <div className="video-bg-wrapper">
        <video src={videoBg} autoPlay loop muted playsInline className="video-bg"></video>
      </div>

      <div
        className="nav-scrolltop-bar"
        x-bind:class="
        !scrolledFromTop 
          ? 'bg-turquoise-500 opacity-0' 
          : (window.innerWidth >= 768 
              ? 'bg-turquoise-500 opacity-50' 
              : 'bg-turquoise-500 opacity-90')"
      ></div>
    </>
  );};

export default VideoBg;
