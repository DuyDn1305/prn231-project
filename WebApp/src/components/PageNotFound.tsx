import { NavLink } from "react-router-dom";

import notFoundImage from "../assets/error_page.jpg";

function PageNotFound() {
  return (
    <div className="flex h-[80vh] flex-col items-center justify-center text-5xl">
      Page Not Found
      <img src={notFoundImage} className="mt-4 max-h-80" />
      <NavLink
        to="/"
        className="text-xl text-purple-600 drop-shadow-xl hover:text-opacity-70"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
          />
        </svg>
        Back to view books
      </NavLink>
    </div>
  );
}

export default PageNotFound;
