import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { useRecoilState } from "recoil";
import { userInfo } from "../Store/userInfo";

const Login = () => {
  const [user, setUserInfo] = useRecoilState(userInfo);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erMsg, setErMsg] = useState(null);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://paytmmodeltest.onrender.com/api/v1/users/login",
        {
          userName: email,
          password: password,
        }
      );

      if (res.data.success) {
        // Set cookies for authentication status and user info
        Cookies.set("authStatus", true, { expires: 7, path: "/" });
        Cookies.set("userInfo", JSON.stringify(res.data.userinfo), {
          expires: 7,
          path: "/",
        });
        setUserInfo(res.data.userinfo);
        // console.log("here");
        navigate("/dashboard");
      } else {
        setErMsg(true);
        setEmail("");
        setPassword("");
      }
    } catch (e) {
      console.log(e);
      setErMsg(true);
    }
  }

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 text-white">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>
        {erMsg && (
          <div className="text-red-900 mt-10 text-center">
            Invalid Credentials, please try again
          </div>
        )}
        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?
          <Link className="text-blue-700 ml-5" to="/signin">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
