import React from 'react';
import Reveal from './Reveal';

const VideoCard = ({
  thumbnailSrc,
  youtubeLink,
  date,
  title,
  mainContent,
  responsibilityLabel,
  responsibilityContent,
  casestudyLabel,
  casestudyLink,
}) => {
  const showVideoLink = youtubeLink && youtubeLink !== null;
  const showCaseStudy = casestudyLink && casestudyLink !== null;

  return (
    <Reveal>
      <div className="card-wrapper">
        <div className="card-thumbnail-wrapper md:!max-w-[45%] md:!min-w-[45%] md:!w-[45%]">
          {showVideoLink && (
            <a
              href={youtubeLink}
              className="group video-play-btn"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Play video"
            >
              <svg
                className="video-play-icon group-hover:fill-white min-[360px]:group-w-18 min-[360px]:group-h-18 sm:group-hover:w-9 sm:group-hover:h-9"
                viewBox="0 0 16 16"
              >
                <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393" />
              </svg>
              <span className="sr-only">Play video</span>
            </a>
          )}

          <img
            src={thumbnailSrc}
            className="card-thumbnail-img !w-full"
            alt="Thumbnail"
          />
        </div>

        <div className="card-content-wrapper md:!w-auto md:!flex-1">
          <div className="card-content card-content-date">{date}</div>
          {title}

          {mainContent}

          {responsibilityLabel && (
            <h3 className="card-content card-content-subtitle">
              {responsibilityLabel}
            </h3>
          )}
          {responsibilityContent && <div>{responsibilityContent}</div>}

          {showCaseStudy ? (
            <a
              href={casestudyLink}
              className="card-content card-content-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              {casestudyLabel}
              <svg
                className="card-link-icon fill-violet-500"
                viewBox="0 0 16 16"
              >
                <path
                  d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5"
                  strokeWidth="0.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z"
                  strokeWidth="0.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          ) : (
            <p className="card-content card-content-footer">
              <i>Design process available upon request</i>
            </p>
          )}
        </div>
      </div>
    </Reveal>
  );
};

export default VideoCard;
