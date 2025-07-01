import React from 'react'
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from "../components/Navbar";
import myPhoto from '../assets/myPhoto.png';
import thumbnailCBM from '../assets/thumbnailCBM.png';
import Consultant from '../assets/Consultant.svg';

const Contact = () => {

  return (
    <>
      <div className="fixed h-[74px] z-2 top-0 self-auto w-full bg-turquoise-500 opacity-0"
                x-bind:class="{'bg-turquoise-500 opacity-0': !scrolledFromTop, 'bg-turquoise-500 opacity-50': scrolledFromTop}" x-transition="true"></div>
      
      <div className="flex flex-col items-center relative transition-all duration-200 ease-in-out">
        
        <div className="text-white flex flex-col self-auto w-[1024px] h-auto static">
                    <Link to="/" className="mx-24 mt-[12px] self-start relative z-101">
                <img src={myPhoto} className="w-12 h-12" alt="Srikumar's Photo" x-transition="true"/>
            </Link>
        </div>
      </div>
    </>
  );
}

export default Contact