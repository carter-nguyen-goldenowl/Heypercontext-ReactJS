import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import * as auth from "./authSlice";
import { api } from "../services/api";

export default function Register() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [registerInput, setRegister] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    errors_list: [],
  });

  const handleInput = (e) => {
    let key = e.target.name;
    let val = e.target.value;

    setRegister({ ...registerInput, [key]: val });
  };

  const registerSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name: registerInput.name,
      email: registerInput.email,
      password: registerInput.password,
      confirm_password: registerInput.confirm_password,
    };
    try {
      const response = await api.register(data);
      if (response.data.status === 200) {
        toast.success(response.data.message);
        dispatch(auth.actions.register(response.data.email));
        history.push("/");
      }
    } catch (error) {
      setRegister({
        ...registerInput,
        errors_list: error.response.data.errors,
      });
    }
  };

  return (
    <section className="h-screen">
      <div className="px-6 h-full text-gray-800">
        <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
          <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="w-full"
              alt="Sample image"
            />
          </div>
          <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
            <form onSubmit={registerSubmit}>
              <div className="mb-6">
                <input
                  type="text"
                  name="name"
                  value={registerInput.name}
                  onChange={(e) => handleInput(e)}
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Name"
                  required
                />
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  {registerInput.errors_list.name}
                </p>
              </div>
              <div className="mb-6">
                <input
                  type="email"
                  name="email"
                  value={registerInput.email}
                  onChange={(e) => handleInput(e)}
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Email address"
                  required
                />
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  {registerInput.errors_list.email}
                </p>
              </div>
              <div className="mb-6">
                <input
                  type="password"
                  name="password"
                  value={registerInput.password}
                  onChange={(e) => handleInput(e)}
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Password"
                  required
                />
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  {registerInput.errors_list.password}
                </p>
              </div>

              <div className="mb-6">
                <input
                  type="password"
                  name="confirm_password"
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Confirm Password"
                  required
                  value={registerInput.confirm_password}
                  onChange={(e) => handleInput(e)}
                />
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  {registerInput.errors_list.confirm_password}
                </p>
              </div>

              <div className="text-center lg:text-left">
                <button
                  type="submit"
                  className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                >
                  Register
                </button>
                <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                  already registered?
                  <Link
                    to="/"
                    className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                  >
                    Login
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
