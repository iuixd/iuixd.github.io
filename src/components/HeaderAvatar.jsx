import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion, useReducedMotion } from "framer-motion";
import myPhoto from "../assets/myPhoto.webp";

// The single 40x40 header-state instance of the profile photo. Shares layoutId
// "profile-avatar" with the hero-state instance in HeroSection so Framer Motion animates
// the swap between them instead of the two ever being visible at once.
//
// Horizontal position mirrors .body-container's own width caps (w-full / lg:w-[1000px] /
// xl:w-[1200px], centered by the flex track below) plus .photo-link's ml offset
// (mx-[10%] / lg:ml-24) — the same layout the hero photo itself uses — so the avatar's left
// edge lines up exactly with the hero position at every width where that's actually safe.
// The one exception is md-only (768-1023px): .body-container has no extra centering offset
// there yet, so mirroring ml-24 exactly would land the avatar past where the nav's own
// pl-[96px] gap ends, overlapping the centered nav pill (verified: nav pill's left edge is
// only ~111-162px there, vs. ml-24 putting the avatar's right edge at ~162-174px). ml-[15px]
// keeps it safely inside that reserved gap at this one width band; every other breakpoint
// (mobile and lg/xl) already has enough natural clearance to match the hero position exactly.
export default function HeaderAvatar() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="header-avatar-track">
      <div className="min-[360px]:w-full md:w-full lg:w-[1000px] xl:w-[1200px]">
        <Link
          to="/"
          className="header-avatar-link min-[360px]:ml-[10%] md:ml-[15px] lg:ml-24"
          aria-label="Go to homepage"
        >
          <motion.img
            layoutId="profile-avatar"
            transition={shouldReduceMotion ? { duration: 0 } : { type: "spring", stiffness: 300, damping: 30 }}
            src={myPhoto}
            className="header-avatar-img"
            alt="Srikumar's Photo"
            width="40"
            height="40"
            fetchPriority="high"
          />
        </Link>
      </div>
    </div>
  );
}
