import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const navRef = useRef(null);
  const itemRefs = useRef({});

  const left = useMotionValue(0);
  const width = useMotionValue(0);
  const opacity = useMotionValue(0);

  const springLeft = useSpring(left, { stiffness: 400, damping: 30 });
  const springWidth = useSpring(width, { stiffness: 400, damping: 30 });
  const springOpacity = useSpring(opacity, { stiffness: 400, damping: 30 });

  const navItems = [
    { label: 'About', path: '/srikumar/about' },
    { label: 'Articles', path: '/srikumar/articles' },
    { label: 'GitHub', path: '/srikumar/github' },
    { label: 'Contact', path: '/srikumar/contact' },
  ];

  const calculatePosition = (el) => {
    if (!el || !navRef.current) return { left: 0, width: 0, opacity: 0 };
    const rect = el.getBoundingClientRect();
    const parentRect = navRef.current.getBoundingClientRect();
    return {
      left: rect.left - parentRect.left,
      width: rect.width,
      opacity: 0.4,
    };
  };

  useEffect(() => {
    const activeItem = navItems.find((item) => location.pathname === item.path);
    if (activeItem) {
      const el = itemRefs.current[activeItem.path];
      if (el) {
        const pos = calculatePosition(el);
        requestAnimationFrame(() => {
          left.set(pos.left);
          width.set(pos.width);
          opacity.set(pos.opacity);
        });
      }
    } else {
      // User is on a non-menu route like /srikumar (home)
      left.set(0);
      width.set(0);
      opacity.set(0); // Hide the indicator
    }
  }, [location.pathname]);

  const handleMouseEnter = (e) => {
    const pos = calculatePosition(e.target);
    left.set(pos.left);
    width.set(pos.width);
    opacity.set(pos.opacity);
  };

  const handleMouseLeave = () => {
    const activeItem = navItems.find((item) => location.pathname === item.path);
    if (activeItem) {
      const el = itemRefs.current[activeItem.path];
      if (el) {
        const pos = calculatePosition(el);
        left.set(pos.left);
        width.set(pos.width);
        opacity.set(pos.opacity);
      } else {
        opacity.set(0);
      }
    } else {
      opacity.set(0);
    }
  };

  return (
    <nav
      className="fixed z-100 top-0 w-full"
      role="navigation"
      aria-label="Main navigation"
      aria-labelledby="main-navigation-label"
    >
      <h2 id="main-navigation-label" className="sr-only">
        Primary navigation
      </h2>
      <div className="flex justify-center items-center mt-2 mb-2">
        <ul
          ref={navRef}
          onMouseLeave={handleMouseLeave}
          role="menubar"
          className="relative flex items-center px-4 rounded-[8px] font-medium border border-[rgba(255,255,255,0.20)] bg-[linear-gradient(153deg,_rgba(255,_255,_255,_0.20)_0%,_rgba(255,_255,_255,_0.00)_100%)] backdrop-filter backdrop-blur-[21px]"
            x-bind:class="{'bg-[linear-gradient(153deg,_rgba(255,_255,_255,_0.10)_0%,_rgba(255,_255,_255,_0.00)_100%)]': !scrolledFromTop, 'bg-[linear-gradient(153deg,_rgba(255,_255,_255,_0.50)_0%,_rgba(255,_255,_255,_0.00)_100%)]': scrolledFromTop}" x-transition
        >
          {navItems.map((item) => (
            <li
              key={item.path}
              ref={(el) => (itemRefs.current[item.path] = el)}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="relative z-100 mr-3 px-3 py-4 text-sm font-normal cursor-pointer transition-all duration-300"
            >
              <Link
                to={item.path}
                role="menuitem"
                tabIndex={0}
                onFocus={() => {
                  const el = itemRefs.current[item.path];
                  if (el) {
                    const pos = calculatePosition(el);
                    left.set(pos.left);
                    width.set(pos.width);
                    opacity.set(pos.opacity);
                  }
                }}
                className={`focus:outline-none ${
                  location.pathname === item.path
                    ? "text-turquoise-900 font-semibold scale-105"
                    : "text-turquoise-900 hover:text-turquoise-900"
                }`}
                aria-current={
                  location.pathname === item.path ? "page" : undefined
                }
              >
                {item.label}
              </Link>
            </li>
          ))}

          <motion.li
            style={{
              left: springLeft,
              width: springWidth,
              opacity: springOpacity,
              top: "12px",
            }}
            className="absolute z-50 h-7 rounded-full bg-white shadow-lg"
            layout
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;