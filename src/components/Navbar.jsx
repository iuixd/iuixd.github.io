import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import Reveal from "./Reveal";
import myPhoto from "../assets/myPhoto.png";

const Navbar = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 550); // initialize correctly

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      setScreenWidth(width);
      setScreenHeight(height);
      setIsMobile(width <= 550);
    };

    // Initial check (in case resize hasn't occurred)
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    { label: "About", path: "/about" },
    { label: "GitHub", path: "/github" },
    { label: "Vibe-Coding Apps", path: "/vibe-coding-apps" },
    { label: "Contact", path: "/contact" },
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

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Reveal>
      <nav
        className={`nav-container transition-all duration-300 ease-in-out z-101 ${
          isMenuOpen ? "max-[550px]:z-101" : "max-[550px]:z-3"
        } `}
        x-data="{ scrolledFromTop: false }"
        x-init="
        window.addEventListener('scroll', () => {
          scrolledFromTop = window.scrollY > 180;
        });
      "
        x-bind:class="$store.page.name === 'home' 
        ? (scrolledFromTop 
          ? (window.innerWidth >= 550 
            ? 'pl-[96px]' 
            : 'pl-auto')
          : 'md:pl-auto') 
        : (window.innerWidth >= 550 
            ? 'pl-[96px]' 
            : 'pl-auto')"
        role="navigation"
        aria-label="Main navigation"
        aria-labelledby="main-navigation-label"
      >
        <h2 id="main-navigation-label" className="sr-only">
          Primary navigation
        </h2>
        <div className="nav-wrapper ">
          <ul
            ref={navRef}
            onMouseLeave={handleMouseLeave}
            role="menubar"
            aria-label="Main navigation"
            className={`relative nav-menubar ${
              isMenuOpen ? "max-[550px]:opacity-100" : "max-[550px]:opacity-0"
            } max-[550px]:mr-[16px] max-[550px]:mt-[50px] max-[550px]:flex-col max-[550px]:w-[300px] w-auto min-[550px]:flex-row`}
            x-bind:class="{'bg-[linear-gradient(153deg,_rgba(255,_255,_255,_0.10)_0%,_rgba(255,_255,_255,_0.00)_100%)]': !scrolledFromTop, 'bg-[linear-gradient(153deg,_rgba(255,_255,_255,_0.50)_0%,_rgba(255,_255,_255,_0.00)_100%)]': scrolledFromTop}"
          >
            {navItems.map((item) => (
              <li
                key={item.path}
                ref={(el) => (itemRefs.current[item.path] = el)}
                role="none"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="group nav-menuitem max-[550px]:text-center"
                onClick={toggleMenu}
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
                      ? "font-regular"
                      : "text-turquoise-900"
                  }`}
                  aria-current={
                    location.pathname === item.path ? "page" : undefined
                  }
                >
                  {item.label}
                </Link>
              </li>
            ))}
            {screenWidth >= 550 && (
              <motion.li
                style={{
                  left: springLeft,
                  width: springWidth,
                  opacity: springOpacity,
                  top: "12px",
                }}
                className="nav-active-itembg"
                layout
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                role="none"
              />
            )}
          </ul>

          {isMobile && (
            <button
              className="absolute group mt-2 mr-4 p-1 rounded-md border border-white/40 hover:bg-turquoise-50 cursor-pointer transition"
              onClick={toggleMenu}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                fill="currentColor"
                className="bi bi-list fill-turquoise-50 group-hover:fill-turquoise-900"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
                />
              </svg>
            </button>
          )}
        </div>
      </nav>
    </Reveal>
  );
};

export default Navbar;
