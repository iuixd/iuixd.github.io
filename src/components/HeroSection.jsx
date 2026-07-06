import React from "react";
import SocialLinks from './SocialLinks';
import myPhoto from '../assets/myPhoto.webp';
import Alpine from 'alpinejs';
import Reveal from './Reveal';
import MiniProjectCard from './MiniProjectCard';
import iuixdLogo from '../assets/copilotLogo.svg';

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
          className="transition-all duration-500 ease-in-out"
          x-bind:class="{'w-24 h-24': !scrolledFromTop, 'w-12 h-12': scrolledFromTop}"
          alt="Srikumar's Photo"
          width="288"
          height="288"
          fetchPriority="high"
        />
      </Reveal>
      </a>
      <Reveal>
      <div className="hero-heading">
        Product designer, vibe coder, and amateur developer
        <span className="text-turquoise-500">.</span>
      </div>
      <p className="hero-content">
        UX Design leader with <strong>20+ years</strong> of enterprise <strong>B2B SaaS</strong> experience leading cross-functional design teams to deliver user-centered, outcome-driven product experiences at scale. Combines deep expertise in <strong>design systems</strong>, <strong>systems thinking</strong>, and <strong>usability testing</strong> to advance UX maturity and measurable business results.
      </p>
      <p className="hero-content">
        I'm passionate about crafting user-centric and human AI experiences and I specialize in bringing bold ideas to life from concept to execution.
      </p>
      <p className="hero-content">
        I also explore Vibe Coding, blending creativity with code to shape interactive and expressive digital experiences.
      </p>
      <div className="min-[360px]:mx-[10%] md:mx-24 lg:mx-24 min-[360px]:w-[80%] md:w-[620px] lg:w-[750px] xl:w-[950px] px-0 py-4 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <SocialLinks />
        <div className="flex flex-col sm:flex-row gap-3">
          <MiniProjectCard
            href="https://chatgpt.com/g/g-6a1d86d7cd6c8191b31aab1208a9f622-iuixd-copilot"
            logo={iuixdLogo}
            logoAlt="iuixd Copilot Logo"
            title="iuixd Copilot"
            subtitle="Synthetic user-testing GPT"
            ariaLabel="iuixd Copilot - Synthetic user-testing GPT"
          />
          <MiniProjectCard
            href="https://www.figma.com/community/plugin/1654850184639725883"
            logo={iuixdLogo}
            logoAlt="iuixd Design Converter Logo"
            title="iuixd Design Converter"
            subtitle="Docs → Figma Variables"
            ariaLabel="iuixd Design Converter - Docs to Figma Variables"
          />
        </div>
      </div>
      </Reveal>
    </>
  );
};

export default Hero;

