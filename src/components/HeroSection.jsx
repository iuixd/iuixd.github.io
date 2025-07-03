import React from "react";
import SocialLinks from './SocialLinks';
import myPhoto from '../assets/myPhoto.png';
import Alpine from 'alpinejs';

window.Alpine = Alpine;
 
Alpine.start();

const Hero = () => {
  return (
    <>
      <a
        href="#"
        className="mx-24 self-start relative z-100 transition-all duration-200 ease-in-out transition duration-600"
        x-bind:class="{'relative': !scrolledFromTop, 'sticky top-3.5': scrolledFromTop}"
        x-transition
      >
        <img
          src={myPhoto}
          className="w-24 h-24"
          x-bind:class="{'w-24 h-24': !scrolledFromTop, 'w-12 h-12': scrolledFromTop}"
          alt="Srikumar's Photo"
          x-transition
        />
      </a>
      <div className="mx-24 w-[810px] font-bold font-bold text-[3.2em] leading-[1.1em] px-[0] py-4 [text-shadow:0_0_1px_#151c1cf0]">
        Product designer, design leader and amateur developer
        <span className="text-turquoise-500">.</span>
      </div>
      <div className="mx-24 w-[810px] text-[1.1em] px-[0] py-4 [text-shadow:0_0_1px_#151c1cf0]">
        I'm Srikumar, an experienced designer based in Bangalore, India. I am
        passionate about crafting user-centric and human-AI experiences, and I
        specialize in bringing bold ideas to life from concept to execution.
      </div>

      <SocialLinks />
    </>
  );
};

export default Hero;
