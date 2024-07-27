import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Signin = () => {
  const [email, setEmail] = useState();
  const [firstname, setFirstName] = useState();
  const [lastname, setLastName] = useState();
  const [Password, setPassword] = useState();
  const [err, seterr] = useState(null);
  const [nav, setNav] = useState(null);
  async function handleSignIn(e) {
    e.preventDefault();
    const val = await axios.post(
      "https://paytmmodeltest.onrender.com/api/v1/users/signup",
      {
        userName: email,
        firstName: firstname,
        lastName: lastname,
        password: Password,
      }
    );
    console.log(val.data);
    if (val.data.msg != "success") {
      seterr(true);
      setNav(false);

    } else {
      seterr(false);
      setNav(true);
      
    }
  }
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
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
        <form className="space-y-6" action="#" method="POST">
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
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              First Name
            </label>
            <div className="mt-2">
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={firstname}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                // autocomplete=""
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Last Name
            </label>
            <div className="mt-2">
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={lastname}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                // autocomplete="email"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                value={Password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              onClick={handleSignIn}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>
        <div
          style={{
            display: "flex",

            justifyContent: "center",
            padding: "10px",
          }}
        >
          <p className="mt-10 text-center text-md text-gray-500">
            Already a member?
          </p>
          <Link className="pl-5 mt-10 text-center text-md text-blue-800" to="/">
            Login
          </Link>
        </div>
        {err && (
          <div
            style={{
              color: "red",
              textAlign: "center",
            }}
          >
            Incorrect Value given try again
          </div>
        )}
        {nav && (
          <div
            style={{
              color: "green",
              textAlign: "center",
            }}
          >
            User Register Successfull!! please login
          </div>
        )}
      </div>
    </div>
  );
};

export default Signin;
