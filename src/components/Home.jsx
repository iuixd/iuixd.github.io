import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Reveal from './Reveal';
import HeroSection from './HeroSection';
import ProjectCard from './ProjectCard';
import VideoBg from './VideoBg';
import certBadges from '../assets/certBadges.webp';
import Work from './Work';
import Footer from './Footer';

function Home() {
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();
  const footerRevealSentinelRef = useRef(null);
  const [isFooterRevealActive, setIsFooterRevealActive] = useState(false);

  useEffect(() => {
    const sentinel = footerRevealSentinelRef.current;
    if (!sentinel) return undefined;
    if (typeof IntersectionObserver === 'undefined') {
      setIsFooterRevealActive(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsFooterRevealActive(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

    return (
      <>

        <VideoBg />

        <div className="body-wrapper"
          data-page-name="home"
          x-data="{ pageName: $root.dataset.pageName }"
          x-init="$store.page.name = pageName"
        >
          <div className="body-container">

            <main className="footer-reveal-content">
              <HeroSection />

              <div className="content-wrapper">
                <div className="cert-wrapper">
                <Reveal>
                  <img
                    src={certBadges}
                    className="w-full max-w-2xl h-auto px-4 sm:px-0 object-contain mx-auto"
                    alt="Srikumar's Certificates"
                    width="882"
                    height="180"
                    loading="lazy"
                  />
                </Reveal>
                </div>

                <section id="projects-and-works" className='projects-and-works'>
                  <ProjectCard />
                  <Work />
                </section>

              </div>
              <div ref={footerRevealSentinelRef} className="footer-reveal-sentinel" aria-hidden="true" />
            </main>
            <div
              className={`footer-reveal-layer${isFooterRevealActive ? ' footer-reveal-layer-visible' : ''}`}
              aria-hidden={!isFooterRevealActive}
              inert={isFooterRevealActive ? undefined : ''}
            >
              <Footer withGame gameEnabled={isFooterRevealActive} />
            </div>
          </div>
        </div>
      </>
    );
}

export default Home;
