import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { register } from "../../apis/User.api";
import { notifySuccess } from "../../components/Notification";

function SignUp() {
  const navigate = useNavigate();
  let username = useRef("");
  let password = useRef("");
  let email = useRef("");
  //   let phone = useRef("");

  const handleNavigateToLogin = () => {
    navigate("/login");
  };

  const mutation = useMutation({
    mutationFn: () => {
      return register({
        userId: 0,
        userName: username.current,
        password: password.current,
        email: email.current,
        phone: "",
        bookmarks: [],
        ratings: [],
        votes: []
      });
    },
    onSuccess: () => {
      notifySuccess("New account registration successful!");
      navigate("/login");
    }
  });

  const handleRegister = (e: React.ChangeEvent<EventTarget>) => {
    e.preventDefault();
    mutation.mutate();
  };

  return (
    <>
      <div className="animate__animated animate__bounceInLeft relative flex min-h-[60vh] flex-col justify-center overflow-hidden">
        <div className="m-auto w-full rounded-md bg-white p-6 shadow-xl shadow-rose-600/40 ring ring-purple-600 lg:max-w-xl">
          <h1 className="text-center text-3xl font-bold uppercase text-purple-700">
            Sign up
          </h1>
          {mutation.error instanceof AxiosError ? (
            JSON.parse(mutation.error.request?.response).message ===
            "Username already exists" ? (
              <h4 className="animate__animated animate__flash text-center text-xl font-bold text-red-500">
                Username already exists
              </h4>
            ) : JSON.parse(mutation.error.request?.response).message ===
              "Email already exists" ? (
              <h4 className="animate__animated animate__flash text-center text-xl font-bold text-red-500">
                Email already exists
              </h4>
            ) : null
          ) : null}
          <form className="mt-6" onSubmit={handleRegister}>
            <div className="mb-2">
              <label
                htmlFor="username"
                className="block text-sm font-semibold text-gray-800"
              >
                Username
              </label>
              <input
                onChange={(e) => (username.current = e.target.value)}
                type="username"
                pattern="^[a-z0-9_-]{6,16}$"
                title="Username not contain special characters or spaces"
                className="mt-2 block w-full rounded-md border bg-white px-4 py-2 text-purple-700 focus:border-purple-400 focus:outline-none focus:ring focus:ring-purple-300 focus:ring-opacity-40"
                required
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-800"
              >
                Password
              </label>
              <input
                onChange={(e) => (password.current = e.target.value)}
                type="password"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                className=" mt-2 block w-full rounded-md border bg-white px-4 py-2 text-purple-700 focus:border-purple-400 focus:outline-none focus:ring focus:ring-purple-300 focus:ring-opacity-40"
                required
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-800"
              >
                Email
              </label>
              <input
                onChange={(e) => (email.current = e.target.value)}
                type="email"
                pattern="\S+@\S+\.\S+"
                title="Email address is not valid"
                className=" mt-2 block w-full rounded-md border bg-white px-4 py-2 text-purple-700 focus:border-purple-400 focus:outline-none focus:ring focus:ring-purple-300 focus:ring-opacity-40"
                required
              />
            </div>
            <div className="mt-6">
              <button className="w-full transform rounded-md bg-purple-700 px-4 py-2 tracking-wide text-white transition-colors duration-200 hover:bg-purple-600 focus:bg-purple-600 focus:outline-none">
                Sign Up
              </button>
            </div>
          </form>

          <p className="mt-8 text-center text-xs font-light text-gray-700">
            {" "}
            Have an account?{" "}
            <span
              className="font-medium text-purple-600 hover:cursor-pointer hover:underline"
              onClick={handleNavigateToLogin}
            >
              Login now!
            </span>
          </p>
        </div>
      </div>
    </>
  );
}

export default SignUp;
