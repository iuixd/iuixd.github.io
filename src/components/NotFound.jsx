import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import myPhoto from "../assets/myPhoto.png";

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Navigates one step back in history
  };

  return (
    <>
      <div className="flex h-screen items-center justify-center text-turquoise-900">
        <div className="text-center">
          <div className="flex items-center pb-6">
            <p className="flex items-center">
              <span className="mr-1 text-4xl font-bold">404</span> <div class="border-l border-turquoise-900 h-6 mx-4"></div> Page not found.
            </p>
          </div>

          <div className="flex items-center justify-center transition-all duration-300 ease-in-out">
            <Link
              to="#"
              onClick={(e) => {
                e.preventDefault();
                window.history.back();
              }}
              className="group flex w-fit h-12 pl-4 pr-5 text-sm font-medium group-hover:font-semibold items-center justify-center text-violet-700 hover:text-white border border-violet-500/20 hover:bg-violet-500 rounded-full transition-colors duration-150 ease-in-out cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="w-5 h-5 mr-2 fill-violet-700 group-hover:fill-white"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5"
                ></path>
              </svg>
              GO BACK
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
