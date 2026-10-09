import React, { useEffect, useRef } from "react";
import SocialLinks from './SocialLinks';
import myPhoto from '../assets/myPhoto.webp';
import Alpine from 'alpinejs';
import Reveal from './Reveal';
import MiniProjectCard from './MiniProjectCard';
import iuixdLogo from '../assets/copilotLogo.svg';
// eslint-disable-next-line no-unused-vars
import { motion, useReducedMotion } from 'framer-motion';
import { useAvatarMode } from '../context/AvatarContext';

window.Alpine = Alpine

Alpine.store('page', { name: '' })

Alpine.start()

const Hero = () => {
  const heroPhotoRef = useRef(null);
  const { avatarMode, setAvatarMode } = useAvatarMode();
  const shouldReduceMotion = useReducedMotion();

  // Tracks the hero photo's own position (not a magic scroll distance) so the swap to the
  // sticky-header avatar happens exactly when it would visually reach that region. The
  // anchor itself (not the conditionally-rendered image inside it) is observed, and it
  // keeps its w-24/h-24 footprint via CSS regardless of avatarMode, so this target never
  // disappears and the layout never shifts.
  useEffect(() => {
    const node = heroPhotoRef.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setAvatarMode("hero");
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setAvatarMode(entry.isIntersecting ? "hero" : "header"),
      { rootMargin: "-74px 0px 0px 0px", threshold: 0 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [setAvatarMode]);

  return (
    <>
      <a href="#" ref={heroPhotoRef} className="photo-link">
      {avatarMode === "hero" && (
        <Reveal>
          <motion.img
            layoutId="profile-avatar"
            transition={shouldReduceMotion ? { duration: 0 } : { type: "spring", stiffness: 300, damping: 30 }}
            src={myPhoto}
            className="w-24 h-24"
            alt="Srikumar's Photo"
            width="288"
            height="288"
            fetchPriority="high"
          />
        </Reveal>
      )}
      </a>
      <Reveal>
      <div className="hero-heading">
        Design leader, enterprise product strategist and Human-AI experience specialist
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
            href="https://www.figma.com/community/plugin/1654212030415795938/iuixd-styles-converter?q_id=6550b2b2-f334-415a-bbf8-1062847dfca6"
            logo={iuixdLogo}
            logoAlt="iuixd style converter Logo"
            title="iuixd style converter"
            subtitle="Docs → Figma Variables"
            ariaLabel="iuixd style converter - Docs to Figma Variables"
          />
        </div>
      </div>
      </Reveal>
    </>
  );
};

export default Hero;

