import React from "react";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const TimelineProjectCard = ({ href, thumbnail, thumbnailAlt, titleLines, tools, date, idPrefix }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="relative group flex flex-col w-[350px] h-fit items-center rounded-[24px] overflow-hidden bg-turquoise-600 shadow-turquoise-900/10
      shadow-l hover:shadow-xl hover:scale-101 transition-all duration-300"
    >
      <img
        className="w-full z-0 group-hover:scale-110 transition-transform duration-300"
        src={thumbnail}
        alt={thumbnailAlt}
        width="640"
        height="360"
        loading="lazy"
      />

      <span
        className="absolute flex justify-center items-center w-12 h-12 top-[16px] right-[24px]
        group-hover:motion-preset-fade-lg
        group-hover:-translate-y-4 group-hover:translate-x-6 transition-transform duration-300
        rounded-full bg-transparent group-hover:bg-violet-300/50 -rotate-45"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="rgb(255, 255, 255)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </span>

      <div className="flex flex-col z-2 justify-between items-center w-full px-4 py-4 pb-0 text-[11px] text-white/70 bg-turquoise-600">
        <div className="flex flex-col pb-4 w-full leading-normal">
          <h1 className="text-[21px] font-semibold leading-7 tracking-wider text-white/90">
            {titleLines.map((line, index) => (
              <React.Fragment key={line}>
                {index > 0 && <br />}
                {line}
              </React.Fragment>
            ))}
          </h1>
        </div>
        <div className="flex flex-row justify-between items-center w-full pb-4">
          <div className="flex flex-row justify-start gap-2 w-fit">
            {tools.map((tool) => {
              const tooltipId = `${idPrefix}-${tool.key}`;
              return (
                <React.Fragment key={tooltipId}>
                  <div
                    data-tooltip-id={tooltipId}
                    data-tooltip-content={tool.name}
                    className="w-6 h-6 rounded-full bg-turquoise-800 flex justify-center items-center cursor-pointer"
                  >
                    <img src={tool.logo} alt={`${tool.name} Logo`} width="24" height="24" loading="lazy" />
                  </div>
                  <Tooltip
                    id={tooltipId}
                    place="top"
                    className="!text-xs !px-2 !py-[4px] !rounded !bg-black !text-white"
                  />
                </React.Fragment>
              );
            })}
          </div>
          <span className="w-fit text-xs font-light tracking-wide text-turquoise-200">{date}</span>
        </div>
      </div>
    </a>
  );
};

export default TimelineProjectCard;
