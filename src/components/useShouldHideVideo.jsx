import { useEffect, useState } from "react";

const useShouldHideVideo = (breakpoint = 640) => {
  const getShouldHide = () => {
    const isMobile = window.innerWidth < breakpoint;
    const isLandscape = window.innerWidth > window.innerHeight;
    return isMobile || isLandscape;
  };

  const [shouldHide, setShouldHide] = useState(getShouldHide);

  useEffect(() => {
    const handleChange = () => setShouldHide(getShouldHide());
    window.addEventListener("resize", handleChange);
    window.addEventListener("orientationchange", handleChange);

    return () => {
      window.removeEventListener("resize", handleChange);
      window.removeEventListener("orientationchange", handleChange);
    };
  }, [breakpoint]);

  return shouldHide;
};

export default useShouldHideVideo;
