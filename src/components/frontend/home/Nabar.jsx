import React, { useEffect, useState } from "react";
import $ from "jquery";
import Select from "react-select";
import DatePicker from "react-datepicker";
import moment from "moment";

import "react-datepicker/dist/react-datepicker.css";
import "jquery-ui-dist/jquery-ui";
import axios from "axios";

export default function Nabar() {
  const [task, setTask] = useState({
    name: "",
    priority: "200",
    start_date: new Date(),
    end_date: "",
    user_tag: {},
    status: "100",
    hash_tag: {},
    description: "",
  });
  const Hastag = [
    { value: "ios", label: "IOS" },
    { value: "android", label: "ANDROID" },
    { value: "backend", label: "BACKEND" },
    { value: "frontend", label: "FRONTEND" },
    { value: "pc", label: "PC" },
    { value: "tester", label: "TESTER" },
    { value: "desgin", label: "DESGIN" },
  ];
  const Usertag = [
    { value: "carter", label: "Carter" },
    { value: "user", label: "user" },
    { value: "user1", label: "user1" },
  ];

  const handleInputTask = (e) => {
    let key = e.target.name;
    let val = e.target.value;

    setTask({ ...task, [key]: val });
  };

  const onChangeUserTag = (e) => {
    setTask({ ...task, user_tag: e });
  };

  const onChangeHashTag = (e) => {
    setTask({ ...task, hash_tag: e });
  };

  const taskSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: task.name,
      priority: task.priority,
      start_date: moment(task.start_date).format("YYYY-MM-DD"),
      end_date: moment(task.end_date).format("YYYY-MM-DD"),
      user_tag: JSON.stringify(task.user_tag),
      status: task.status,
      hash_tag: JSON.stringify(task.hash_tag),
      description: task.description,
    };

    console.log(data);
    try {
      axios
        .post("/api/task", data)
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error.response.data.errors);
        });
    } catch (error) {}
  };

  useEffect(() => {
    $("#start_date").datepicker({
      onSelect: function (value) {
        setTask({ ...task, start_date: value });
      },
    });
    $("#end_date").datepicker({
      onSelect: function (e) {
        setTask({ ...task, end_date: e });
      },
    });
  }, []);
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
              <input
                type="text"
                className="block w-full py-1.5 pl-10 pr-4 leading-normal rounded-2xl focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 ring-opacity-90 bg-gray-100 dark:bg-gray-800 text-gray-400 aa-input"
                placeholder="Search"
              />
              <div className="absolute right-0 hidden h-auto px-2 py-1 mr-2 text-xs text-gray-400 border border-gray-300 rounded-2xl md:block">
                +
              </div>
            </div>
            <button
              className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ml-10"
              type="button"
              data-modal-toggle="extralarge-modal"
            >
              New Task
            </button>
          </div>
          <div className="relative p-1 flex items-center justify-end w-1/4 ml-5 mr-4 sm:mr-0 sm:right-auto">
            <h1 className="text-neutral-50 mr-4">
              Hi {localStorage.getItem("auth_name")}
            </h1>
            <a href="#" className="block relative">
              <img
                alt="profil"
                src={localStorage.getItem("link_avt")}
                className="mx-auto object-cover rounded-full h-10 w-10 "
              />
            </a>
          </div>
        </div>
      </div>
      <div
        id="extralarge-modal"
        tabIndex={-1}
        className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full"
      >
        <div className="relative p-4 w-full max-w-7xl h-full md:h-auto">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex justify-between items-center p-5 rounded-t border-b dark:border-gray-600">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                Task
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-toggle="extralarge-modal"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <div className=" mx-8 my-8">
              <form onSubmit={taskSubmit}>
                <div className="grid gap-6 mb-6 lg:grid-cols-2">
                  <div>
                    <label
                      htmlFor="Name Task"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Name Task
                    </label>
                    <input
                      type="text"
                      name="name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Task"
                      value={task.name}
                      onChange={(e) => handleInputTask(e)}
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="priority"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Priority Rate
                    </label>
                    <select
                      id="priority"
                      name="priority"
                      value={task.priority}
                      onChange={(e) => handleInputTask(e)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option value="200" selected>
                        Medium Priority
                      </option>
                      <option value="300">High Priority</option>
                      <option value="100">Low Priority</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="Priority Rate"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Date
                    </label>
                    <div className="flex items-center">
                      <div className="relative">
                        <DatePicker
                          placeholderText="start date"
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          selected={task.start_date}
                          onChange={(date) =>
                            setTask({
                              ...task,
                              start_date: date,
                            })
                          }
                        />
                      </div>
                      <span className="mx-4 text-gray-500">to</span>
                      <div className="relative">
                        <DatePicker
                          placeholderText="end date"
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          selected={task.end_date}
                          onChange={(date) =>
                            setTask({
                              ...task,
                              end_date: date,
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="user tag"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      UserTag
                    </label>
                    <Select
                      isMulti={true}
                      options={Usertag}
                      onChange={onChangeUserTag}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="status"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Status
                    </label>
                    <select
                      id="status"
                      name="status"
                      value={task.status}
                      onChange={(e) => handleInputTask(e)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option value="100" selected>
                        Pendding
                      </option>
                      <option value="200">Progress</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="hashtag"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      HashTag
                    </label>
                    <Select
                      isMulti={true}
                      options={Hastag}
                      onChange={onChangeHashTag}
                    />
                  </div>
                </div>

                <label
                  for="message"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Description.
                </label>
                <textarea
                  id="message"
                  name="description"
                  value={task.description}
                  onChange={(e) => handleInputTask(e)}
                  rows="4"
                  class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Description..."
                ></textarea>

                <button
                  type="submit"
                  // data-modal-toggle="extralarge-modal"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 my-2"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
