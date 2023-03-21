import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { getUser, login } from "../../apis/User.api";
import { notifyDefault, notifyError } from "../../components/Notification";

function Login() {
  const navigate = useNavigate();
  let username = useRef("");
  let password = useRef("");

  const handleNavigateToSignUp = () => {
    navigate("/signup");
  };

  const mutation = useMutation({
    mutationFn: () => {
      return login({
        userId: 0,
        userName: username.current,
        password: password.current,
        email: "",
        phone: "",
        bookmarks: [],
        ratings: [],
        votes: []
      });
    },
    onError: () => {
      notifyError("Login fail!");
    },
    onSuccess: (data) => {
      localStorage["token"] = data.data.token;
      localStorage["expiration"] = data.data.expiration;
      localStorage["username"] = username.current;
      mutationUser.mutate();
    }
  });

  const mutationUser = useMutation({
    mutationFn: () => {
      return getUser(username.current);
    },
    onSuccess(data) {
      localStorage["userId"] = data.data.userId;
      notifyDefault("Login success!");
      navigate("/");
    }
  });

  const handleLogin = (e: React.ChangeEvent<EventTarget>) => {
    e.preventDefault();
    mutation.mutate();
  };

  return (
    <div className="animate__animated animate__bounceInLeft relative flex min-h-[60vh] flex-col justify-center overflow-hidden">
      <div className="m-auto w-full rounded-md bg-white p-6 shadow-xl shadow-rose-600/40 ring ring-purple-600 lg:max-w-xl">
        <h1 className="text-center text-3xl font-bold uppercase text-purple-700">
          Sign in
        </h1>
        {mutation.isError && mutation.error instanceof Error ? (
          mutation.error.message == "Request failed with status code 401" ? (
            <h4 className="animate__animated animate__flash text-center text-xl font-bold text-red-500">
              Wrong username or password
            </h4>
          ) : null
        ) : null}
        <form className="mt-6">
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
              className="mt-2 block w-full rounded-md border bg-white px-4 py-2 text-purple-700 focus:border-purple-400 focus:outline-none focus:ring focus:ring-purple-300 focus:ring-opacity-40"
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
              className="mt-2 block w-full rounded-md border bg-white px-4 py-2 text-purple-700 focus:border-purple-400 focus:outline-none focus:ring focus:ring-purple-300 focus:ring-opacity-40"
            />
          </div>
          <a href="#" className="text-xs text-purple-600 hover:underline">
            Forget Password?
          </a>
          <div className="mt-6">
            <button
              className="w-full transform rounded-md bg-purple-700 px-4 py-2 tracking-wide text-white transition-colors duration-200 hover:bg-purple-600 focus:bg-purple-600 focus:outline-none"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
        </form>

        <p className="mt-8 text-center text-xs font-light text-gray-700">
          {" "}
          Don't have an account?{" "}
          <span
            className="font-medium text-purple-600 hover:cursor-pointer hover:underline"
            onClick={handleNavigateToSignUp}
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
