import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import ModalDeleteTask from "../Task/ModalDeleteTask";
import ModalEditTask from "../Task/ModalEditTask";
import Task from "../Task/Task";
import { useDispatch } from "react-redux";
import * as authSlice from "../auth/authSlice";
import * as taskSlice from "../Task/taskSlice";
import { useHistory } from "react-router-dom";
import { api } from "../services/api";
import { toast } from "react-toastify";
import PostFilterForm from "./PostFilterForm";

export default function Nabar() {
  const history = useHistory();
  const dispatch = useDispatch();
  const logOut = () => {
    try {
      const response = api.logout();
      if (response) {
        dispatch(authSlice.actions.logout());
        history.push("/");
        localStorage.clear();
        toast.success(response.data.data.message);
      }
    } catch (error) {}
  };

  const hanldeFiltersChange = async (searchName) => {
    try {
      if (searchName.searchName === "") {
        const response = await api.fetchTask();
        dispatch(taskSlice.actions.fetchTask(response.data.data));
      } else {
        const response = await api.searchTask(searchName.searchName);
        if (response) {
          dispatch(taskSlice.actions.searchTask(response.data.data));
        }
      }
    } catch (error) {}
  };
  return (
    <header className="w-full shadow-lg bg-white dark:bg-gray-700 items-center h-16 rounded-2xl z-40">
      <div className="relative z-20 flex flex-col justify-center h-full px-3 mx-auto flex-center">
        <div className="relative items-center pl-1 flex w-full lg:max-w-68 sm:pr-2 sm:ml-0">
          <div className="container relative left-0 z-50 flex w-3/4 h-auto ">
            <div className="relative flex items-center w-full lg:w-64 h-full group">
              <div className="absolute z-50 flex items-center justify-center w-auto h-10 p-3 pr-2 text-sm text-gray-500 uppercase cursor-pointer sm:hidden">
                <svg
                  fill="none"
                  className="relative w-5 h-5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <svg
                className="absolute left-0 z-20 hidden w-4 h-4 ml-4 text-gray-500 pointer-events-none fill-current group-hover:text-gray-400 sm:block"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"></path>
              </svg>
              <PostFilterForm onSubmit={hanldeFiltersChange} />
            </div>
            <button
              className="block text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 ml-10"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#createModal"
            >
              New Task
            </button>
          </div>
          <div className="relative p-1 flex items-center justify-end w-1/4 ml-5 mr-4 sm:mr-0 sm:right-auto">
            <h1 className="text-neutral-50 mr-4">
              Hi {localStorage.getItem("auth_name")}
            </h1>
            <a className="block relative">
              <img
                alt="profil"
                src={localStorage.getItem("link_avt")}
                className="mx-auto object-cover rounded-full h-10 w-10 "
              />
            </a>
          </div>
          <a>
            <FontAwesomeIcon
              icon={faSignOut}
              className=" dark:text-white ml-2"
              size="lg"
              onClick={() => logOut()}
            />
          </a>
        </div>
      </div>
      <Task />
      <ModalEditTask />
      <ModalDeleteTask />
    </header>
  );
}
