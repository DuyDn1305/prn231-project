import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { notifyDefault } from "./Notification";

function LoginNavigation() {
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    notifyDefault("Logged out!");
    navigate("/login");
  };

  const sessionExpire = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    notifyDefault("Login session has expired... please login again!");
    navigate("/login");
  };

  if (localStorage["expiration"]) {
    new Date(localStorage["expiration"]) <= new Date() ? sessionExpire() : null;
  }

  const [selected, setSelected] = useState(
    window.location.href.split("/")[3] != null
      ? "/" + window.location.href.split("/")[3]
      : "/"
  );

  useEffect(() => {}, [selected]);
  return (
    <>
      <NavLink
        to="/"
        className="flex h-full cursor-pointer items-center pl-4 pr-4 text-2xl font-extrabold text-purple-900"
        onClick={() => setSelected("/")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon-tabler icon-tabler-brand-edge mr-1 stroke-purple-900"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M20.978 11.372a9 9 0 1 0 -1.593 5.773"></path>
          <path d="M20.978 11.372c.21 2.993 -5.034 2.413 -6.913 1.486c1.392 -1.6 .402 -4.038 -2.274 -3.851c-1.745 .122 -2.927 1.157 -2.784 3.202c.28 3.99 4.444 6.205 10.36 4.79"></path>
          <path d="M3.022 12.628c-.283 -4.043 8.717 -7.228 11.248 -2.688"></path>
          <path d="M12.628 20.978c-2.993 .21 -5.162 -4.725 -3.567 -9.748"></path>
        </svg>
        Dana's Book
      </NavLink>
      {localStorage["username"] ? (
        <>
          <div className="flex items-center">
            <div>
              <div
                className={
                  selected === "/" || selected === "/book"
                    ? "peer flex h-16 w-36 cursor-pointer items-center justify-center pl-4 pr-4 text-2xl font-bold text-white transition-all duration-300 hover:text-opacity-50"
                    : "peer flex h-16 w-36 cursor-pointer items-center justify-center pl-4 pr-4 text-2xl text-white transition-all duration-300 hover:font-bold hover:text-opacity-80"
                }
              >
                Book
              </div>
              <div className="lihov bg-gradient-swap absolute z-10 hidden w-[150px] flex-col rounded-bl-lg rounded-br-2xl rounded-tr-md drop-shadow-lg hover:flex peer-hover:flex ">
                <NavLink
                  className="btn group relative inline-flex items-center justify-start overflow-hidden bg-purple-100 py-3 px-4  transition-all"
                  to="/"
                  onClick={() => setSelected("/")}
                >
                  <span className="-z-1 absolute top-0 left-0 h-0 w-0 bg-gradient-to-r from-purple-400 to-purple-700 transition-all duration-500 ease-out group-hover:h-full group-hover:w-full"></span>
                  <span className="z-10 w-full text-xl text-purple-600 transition-colors duration-300 ease-in-out hover:font-bold group-hover:text-white ">
                    Read all
                  </span>
                </NavLink>
                <NavLink
                  className="btn group relative inline-flex items-center justify-start overflow-hidden rounded-b-lg bg-purple-100 py-3 px-4 transition-all"
                  to="/book/create"
                  onClick={() => setSelected("/book")}
                >
                  <span className="-z-1 absolute top-0 left-0 h-0 w-0 rounded-b-lg bg-gradient-to-r from-purple-400 to-purple-700 transition-all duration-500 ease-out group-hover:h-full group-hover:w-full"></span>
                  <span className="z-10 w-full text-xl text-purple-600 transition-colors duration-300 ease-in-out hover:font-bold group-hover:text-white ">
                    Add new
                  </span>
                </NavLink>
              </div>
            </div>

            <div>
              <div
                className={
                  selected === "/category"
                    ? "peer flex h-16 w-36 cursor-pointer items-center justify-center pl-4 pr-4 text-2xl font-bold text-white transition-all duration-300  hover:text-opacity-50"
                    : "peer flex  h-16 w-36 cursor-pointer items-center justify-center pl-4 pr-4 text-2xl text-white transition-all duration-300 hover:font-bold hover:text-opacity-80"
                }
              >
                Category
              </div>

              <div className="lihov bg-gradient-swap absolute z-10 hidden w-[150px] flex-col rounded-bl-lg rounded-br-2xl rounded-tr-md drop-shadow-lg hover:flex peer-hover:flex ">
                <NavLink
                  className="btn group relative inline-flex items-center justify-start overflow-hidden rounded-b-lg bg-purple-100 py-3 px-4  transition-all"
                  to="/category/create"
                  onClick={() => setSelected("/category")}
                >
                  <span className="-z-1 absolute top-0 left-0 h-0 w-0 rounded-b-lg bg-gradient-to-r from-purple-400 to-purple-700 transition-all duration-500 ease-out group-hover:h-full group-hover:w-full"></span>
                  <span className="z-10 w-full text-xl text-purple-600 transition-colors duration-300 ease-in-out hover:font-bold group-hover:text-white ">
                    Add new
                  </span>
                </NavLink>
              </div>
            </div>
            <div>
              <div
                className={
                  selected === "/author"
                    ? "peer flex h-16 w-36 cursor-pointer items-center justify-center pl-4 pr-4 text-2xl font-bold text-white transition-all duration-300  hover:text-opacity-50"
                    : "peer flex h-16 w-36 cursor-pointer items-center justify-center pl-4 pr-4 text-2xl text-white transition-all duration-300 hover:font-bold hover:text-opacity-80"
                }
              >
                Author
              </div>

              <div className="lihov bg-gradient-swap absolute z-10 hidden w-[150px] flex-col rounded-bl-lg rounded-br-2xl rounded-tr-md drop-shadow-lg hover:flex peer-hover:flex ">
                <NavLink
                  className="btn group relative inline-flex items-center justify-start overflow-hidden rounded-b-lg bg-purple-100 py-3 px-4  transition-all"
                  to="/author/create"
                  onClick={() => setSelected("/author")}
                >
                  <span className="-z-1 absolute top-0 left-0 h-0 w-0 rounded-b-lg bg-gradient-to-r from-purple-400 to-purple-700 transition-all duration-500 ease-out group-hover:h-full group-hover:w-full"></span>
                  <span className="z-10 w-full text-xl text-purple-600 transition-colors duration-300 ease-in-out hover:font-bold group-hover:text-white ">
                    Add new
                  </span>
                </NavLink>
              </div>
            </div>
            <div>
              <div
                className={
                  selected === "/publisher"
                    ? "peer flex h-16 w-36 cursor-pointer items-center justify-center pl-4 pr-4 text-2xl font-bold text-white transition-all duration-300  hover:text-opacity-50"
                    : "peer flex h-16 w-36 cursor-pointer items-center justify-center pl-4 pr-4 text-2xl text-white transition-all duration-300 hover:font-bold hover:text-opacity-80"
                }
              >
                Publisher
              </div>

              <div className="lihov bg-gradient-swap absolute z-10 hidden w-[150px] flex-col rounded-bl-lg rounded-br-2xl rounded-tr-md drop-shadow-lg hover:flex peer-hover:flex ">
                <NavLink
                  className="btn group relative inline-flex items-center justify-start overflow-hidden rounded-b-lg bg-purple-100 py-3 px-4  transition-all"
                  to="/publisher/create"
                  onClick={() => setSelected("/publisher")}
                >
                  <span className="-z-1 absolute top-0 left-0 h-0 w-0 rounded-b-lg bg-gradient-to-r from-purple-400 to-purple-700 transition-all duration-500 ease-out group-hover:h-full group-hover:w-full"></span>
                  <span className="z-10 w-full text-xl text-purple-600 transition-colors duration-300 ease-in-out hover:font-bold group-hover:text-white ">
                    Add new
                  </span>
                </NavLink>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="pr-2 text-base font-normal  text-white">
              Welcome,{" "}
              <span className="text-gradient-pink-yellow text-lg font-bold">
                {localStorage["username"]}
              </span>
            </div>
            <p
              className="text-gradient-green-blue hover:text-gradient-green-blue ml-2 flex h-full cursor-pointer items-center pr-1 text-lg font-semibold hover:opacity-80"
              onClick={handleLogOut}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6 stroke-green-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                />
              </svg>
              Log Out
            </p>
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center"></div>

          <div className="flex items-center">
            <NavLink
              className="flex h-full cursor-pointer items-center pl-4 pr-1 text-lg font-light text-white hover:text-neutral-400"
              to="/login"
            >
              Log In
            </NavLink>
            <span className=" text-white">/</span>
            <NavLink
              className="flex h-full cursor-pointer items-center pl-1 pr-4 text-lg font-light text-white hover:text-neutral-400"
              to="/signup"
            >
              Sign Up
            </NavLink>
          </div>
        </>
      )}
    </>
  );
}

export default LoginNavigation;
