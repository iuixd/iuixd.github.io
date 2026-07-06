import React from "react";

const MiniProjectCard = ({ href, logo, logoAlt, title, subtitle, ariaLabel }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-3 px-4 py-3 rounded-2xl border border-white/20 bg-white/5 hover:bg-white/10 transition-all duration-300 select-none text-left no-underline"
      aria-label={ariaLabel}
    >
      <div className="w-10 h-10 rounded-full border border-white/40 flex items-center justify-center p-2.5 group-hover:p-2 shrink-0 group-hover:bg-turquoise-50 group-hover:scale-105 transition-all duration-300 overflow-hidden">
        <img src={logo} alt={logoAlt} className="w-full h-full object-contain" width="40" height="40" loading="lazy" />
      </div>

      <div className="flex flex-col justify-center">
        <h3 className="text-sm sm:text-base font-bold text-white tracking-tight leading-tight group-hover:text-violet-500 transition-colors duration-200">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-white/60 leading-normal font-medium group-hover:text-white transition-colors duration-200">
          {subtitle}
        </p>
      </div>
    </a>
  );
};

export default MiniProjectCard;
