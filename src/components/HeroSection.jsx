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
        className="social-link"
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
      <div className="hero-heading">
        Product designer, vibe coder, and amateur developer
        <span className="text-turquoise-500">.</span>
      </div>
      <p className="hero-paragraph">
        I’m Srikumar, a UX Design Consultant with two decades of experience in B2B/B2C SaaS and 0–1 startup product design, working with <a href="https://www.linkedin.com/company/ibm" className="hero-paragraph-link" target="_blank">IBM,</a> <a href="https://www.linkedin.com/company/target" className="hero-paragraph-link" target="_blank">Target,</a> <a href="https://www.linkedin.com/company/innominds" className="hero-paragraph-link" target="_blank">Innominds,</a> <a href="https://www.linkedin.com/company/dbs-bank/" className="hero-paragraph-link" target="_blank">DBS Bank SG,</a> <a href="https://www.linkedin.com/company/colortokens/" className="hero-paragraph-link" target="_blank">ColorTokens,</a> <a href="https://www.linkedin.com/company/quick-heal-technologies-pvt--ltd-/" className="hero-paragraph-link" target="_blank">Quick Heal,</a> <a href="https://www.linkedin.com/company/mcafee/" className="hero-paragraph-link">McAfee</a> and others.
      </p>
      <p className="hero-paragraph">
        I am passionate about crafting user-centric and human AI experiences and I specialize in bringing bold ideas to life from concept to execution.
      </p>
      <p className="hero-paragraph">
        I also explore Vibe Coding, blending creativity with code to shape interactive and expressive digital experiences.
      </p>

      <SocialLinks />
    </>
  );
};

export default Hero;

