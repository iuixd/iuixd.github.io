import React from "react";
import copilotLogo from "../assets/copilotLogo.svg";

const IxuidCopilotCard = () => {
  return (
    <a
      href="https://chatgpt.com/g/g-6a1d86d7cd6c8191b31aab1208a9f622-iuixd-copilot"
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-4 p-4 sm:p-5 rounded-2xl border border-white/40 transition-all duration-300 w-full max-w-[520px] select-none text-left no-underline"
      aria-label="Welcome to iuixd Copilot - a synthetic user testing GPT. By K K Srikumar"
    >
      {/* Outer Circular Logo */}
      <div className="w-12 h-12 rounded-full border border-white/40 flex items-center justify-center p-1.5 shrink-0 group-hover:bg-turquoise-50 group-hover:scale-105 transition-all duration-300 overflow-hidden">
        <img src={copilotLogo} alt="iuixd Copilot Logo" className="w-full h-full object-contain" width="48" height="48" loading="lazy" />
      </div>

      {/* Text Content */}
      <div className="flex flex-col justify-center">
        <h3 className="text-base sm:text-lg font-bold text-white tracking-tight leading-tight group-hover:text-violet-500 transition-colors duration-200">
          iuixd Copilot
        </h3>
        <p className="text-xs sm:text-sm text-white/80 mt-1 leading-normal font-medium group-hover:text-white transition-colors duration-200">
          Welcome to iuixd Copilot - a synthetic user testing GPT
        </p>
        <div className="text-[11px] sm:text-xs text-white/40 mt-1.5 flex items-center gap-1 font-semibold group-hover:text-white/60 transition-colors duration-200">
          <span>By K K Srikumar</span>
          <span className="text-white/20 group-hover:text-white/30 transition-colors duration-200">•</span>
          <span className="flex items-center gap-1 text-white/60 group-hover:text-white/80 transition-colors duration-200">
            <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 fill-current opacity-80" aria-hidden="true">
              <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            </svg>
            10+
          </span>
        </div>
      </div>
    </a>
  );
};

export default IxuidCopilotCard;
