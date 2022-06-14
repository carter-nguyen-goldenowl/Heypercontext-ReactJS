import React, { useEffect, useState } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";
import * as taskSlice from "./taskSlice";
import { api } from "../services/api";
import { toast } from "react-toastify";

export default function Task() {
  const dispatch = useDispatch();
  const [task, setTask] = useState({
    name: "",
    priority: 200,
    start_date: new Date(),
    end_date: "",
    user_tag: null,
    status: 100,
    hash_tag: null,
    description: null,
    list_errors: [],
  });

  const [userTag, setUserTag] = useState([]);

  const Hastag = [
    { value: "ios", label: "IOS" },
    { value: "android", label: "ANDROID" },
    { value: "backend", label: "BACKEND" },
    { value: "frontend", label: "FRONTEND" },
    { value: "pc", label: "PC" },
    { value: "tester", label: "TESTER" },
    { value: "desgin", label: "DESGIN" },
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

  const taskSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: task.name,
      user_id: localStorage.getItem("user_id"),
      priority: task.priority,
      start_date: moment(task.start_date).format("YYYY-MM-DD"),
      end_date: moment(task.end_date).format("YYYY-MM-DD"),
      user_tag: task.user_tag != null ? JSON.stringify(task.user_tag) : null,
      status: task.status,
      hash_tag: task.hash_tag != null ? JSON.stringify(task.hash_tag) : null,
      description: task.description,
    };

    try {
      const response = await api.createTask(data);
      if (response) {
        dispatch(taskSlice.actions.createTask(response.data.data));
        setTask({
          ...task,
          name: "",
          priority: 200,
          start_date: new Date(),
          end_date: "",
          user_tag: null,
          status: 100,
          hash_tag: null,
          description: "",
          list_errors: [],
        });
        toast.success(response.data.message);
      }
    } catch (error) {
      setTask({
        ...task,
        list_errors: error.response.data.errors,
      });
    }
  };

  useEffect(() => {
    async function fetchUser() {
      const response = await api.getAllUser();
      setUserTag(...userTag, response.data.data);
    }
    fetchUser();
  }, []);
  return (
    <div
      id="createModal"
      tabIndex={-1}
      aria-labelledby="editModal"
      aria-hidden="true"
      className="modal fade hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full"
    >
      <div className="modal-dialog relative p-4 mx-24 my-12 w-full max-w-7xl h-full md:h-auto">
        <div className="modal-content relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex justify-between items-center p-5 rounded-t border-b dark:border-gray-600">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Task
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-bs-dismiss="modal"
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
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    {task.list_errors.name}
                  </p>
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
                        selectsStart
                        startDate={task.start_date}
                        minDate={task.start_date}
                        endDate={task.end_date}
                        onChange={(date) =>
                          setTask({
                            ...task,
                            start_date: date,
                          })
                        }
                      />
                      <p className="mt-2 absolute text-sm text-red-600 dark:text-red-500">
                        {task.list_errors.start_date}
                      </p>
                    </div>
                    <span className="mx-4 text-gray-500">to</span>
                    <div className="relative">
                      <DatePicker
                        placeholderText="end date"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        selected={task.end_date}
                        selectsEnd
                        startDate={task.start_date}
                        endDate={task.end_date}
                        minDate={task.start_date}
                        onChange={(date) =>
                          setTask({
                            ...task,
                            end_date: date,
                          })
                        }
                      />
                      <p className="mt-2 absolute text-sm text-red-600 dark:text-red-500">
                        {task.list_errors.end_date}
                      </p>
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
                    options={userTag}
                    onChange={onChangeUserTag}
                    value={task.user_tag}
                  />
                </div>
                <div>
                  <label
                    htmlFor="status"
                    className="block mb-2 mt-4 text-sm font-medium text-gray-900 dark:text-gray-300"
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
                    value={task.hash_tag}
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
                name="description"
                value={task.description}
                onChange={(e) => handleInputTask(e)}
                required
                rows="4"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Description..."
              ></textarea>
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                {task.list_errors.description}
              </p>

              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 my-2"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
