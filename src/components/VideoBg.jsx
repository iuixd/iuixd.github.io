import React, { useEffect, useRef, useState } from 'react';
import videoBg from '../assets/videoBg.mp4';
import useShouldHideVideo from "./useShouldHideVideo";

const VideoBg = () => {
    //const shouldHideVideo = useShouldHideVideo();
      
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
      const [screenHeight, setScreenHeight] = useState(window.innerHeight);
      const [isMobile, setIsMobile] = useState(window.innerWidth <= 550); // initialize correctly
    
      useEffect(() => {
        const handleResize = () => {
          const width = window.innerWidth;
          const height = window.innerHeight;
    
          setScreenWidth(width);
          setScreenHeight(height);
          setIsMobile(width <= 550); 
        };
    
        // Initial check (in case resize hasn't occurred)
        handleResize();
    
        window.addEventListener('resize', handleResize);
    
        return () => window.removeEventListener('resize', handleResize);
      }, []);

  return (
    <>
      {screenWidth > 768 && (
        <div className="video-bg-wrapper">
          <video src={videoBg} autoPlay loop muted className="video-bg"></video>
        </div>
      )}

      <div
        className="nav-scrolltop-bar"
        x-bind:class="
        !scrolledFromTop 
          ? 'bg-turquoise-500 opacity-0' 
          : (window.innerWidth >= 550 
              ? 'bg-turquoise-500 opacity-50' 
              : 'bg-turquoise-500 opacity-90')"
      ></div>
    </>
  );};

export default VideoBg;
