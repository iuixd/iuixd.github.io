import React from "react";
import SocialLinks from './SocialLinks';
import myPhoto from '../assets/myPhoto.webp';
import Alpine from 'alpinejs';
import Reveal from './Reveal';

window.Alpine = Alpine

Alpine.store('page', { name: '' })

Alpine.start()

const Hero = () => {
  return (
    <>
      <a
        href="#"
        className="photo-link"
        x-bind:class="{'relative': !scrolledFromTop, 'sticky top-[12px]': scrolledFromTop}"
      >
      <Reveal>
        <img
          src={myPhoto}
          className="w-24 h-24"
          x-bind:class="{'w-24 h-24': !scrolledFromTop, 'w-12 h-12': scrolledFromTop}"
          alt="Srikumar's Photo"
        />
      </Reveal>
      </a>
      <Reveal>
      <div className="hero-heading">
        Product designer, vibe coder, and amateur developer
        <span className="text-turquoise-500">.</span>
      </div>
      <p className="hero-content">
        I’m Srikumar, a UX Design Consultant with two decades of experience in B2B/B2C SaaS and 0–1 startup product design, working with <a href="https://www.linkedin.com/company/ibm" className="hero-content-link" target="_blank">IBM,</a> <a href="https://www.linkedin.com/company/target" className="hero-content-link" target="_blank">Target,</a> <a href="https://www.linkedin.com/company/innominds" className="hero-content-link" target="_blank">Innominds,</a> <a href="https://www.linkedin.com/company/dbs-bank/" className="hero-content-link" target="_blank">DBS Bank SG,</a> <a href="https://www.linkedin.com/company/colortokens/" className="hero-content-link" target="_blank">ColorTokens,</a> <a href="https://www.linkedin.com/company/quick-heal-technologies-pvt--ltd-/" className="hero-content-link" target="_blank">Quick Heal,</a> <a href="https://www.linkedin.com/company/mcafee/" className="hero-content-link">McAfee</a> and others.
      </p>
      <p className="hero-content">
        I'm passionate about crafting user-centric and human AI experiences and I specialize in bringing bold ideas to life from concept to execution.
      </p>
      <p className="hero-content">
        I also explore Vibe Coding, blending creativity with code to shape interactive and expressive digital experiences.
      </p>
      <div className="hero-content">
        <SocialLinks />
      </div>
      </Reveal>
    </>
  );
};

export default Hero;

