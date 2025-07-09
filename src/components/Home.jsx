import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeroSection from './HeroSection';
import ProjectCard from './ProjectCard';
import VideoBg from './VideoBg';
import certBadges from '../assets/certBadges.png';
import Work from './Work';

function Home() {
  const navigate = useNavigate();

    return (
      <>

        <VideoBg />

        <div className="body-wrapper"
          data-page-name="home"
          x-data="{ pageName: $root.dataset.pageName }" 
          x-init="$store.page.name = pageName" 
        >
          <div className="body-container">
            
            <HeroSection />
            
            <div className="content-wrapper">
              <div className="cert-wrapper">
                <img
                  src={certBadges}
                  className="w-2xl"
                  alt="Srikumar's Certificates"
                />
              </div>

              <div className="project-work-wrapper">

                <ProjectCard />
                <Work />

              </div>
            </div>
            <div className="footer">
              © 2025 srikumar.design
            </div>
          </div>
        </div>
      </>
    );
}

export default Home;

