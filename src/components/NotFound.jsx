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
      <div class="flex h-screen items-center justify-center text-turquoise-900">
        <div class="text-center">
          <img src={myPhoto} className="w-16 h-16 mb-10 mx-auto" />
          <p className="">The page you're looking for can't be found.</p>
          <p className="mt-2 text-9xl">404</p>

          <div className="group sub-content-wrapper h-full items-center justify-center transition-all duration-300 ease-in-out">
            <Link
              to="#"
              onClick={(e) => {
                e.preventDefault();
                window.history.back();
              }}
              className="group flex w-fit h-12 px-4 text-xs font-medium group-hover:font-semibold items-center justify-center text-turquoise-600 group-hover:text-turquoise-900 bg-turquoise-100/40  group-hover:bg-turquoise-100/60 rounded-full transition-colors duration-150 ease-in-out cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="w-5 h-5 mr-2 fill-turquoise-600 group-hover:fill-turquoise-900"
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
