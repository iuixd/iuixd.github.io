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

        <div className="flex flex-col items-center relative transition-all duration-200 ease-in-out">
          <div className="text-white flex flex-col self-auto w-[1200px] pt-40 h-auto static">
            
            <HeroSection />
            
            <div className="mt-20 w-full py-16 flex flex-col items-center justify-center bg-turquoise-400">
              <div className="mb-14">
                <img
                  src={certBadges}
                  className="w-2xl"
                  alt="Srikumar's Certificates"
                />
              </div>

              <div className="flex flex-row w-full px-8">

                <ProjectCard />
                <Work />

              </div>
            </div>
            <div className="w-full h-18 flex flex-col items-center justify-center text-[12px] text-turquoise-500 bg-turquoise-900 font">
              © 2025 srikumar.design
            </div>
          </div>
        </div>
      </>
    );
}

export default Home;

