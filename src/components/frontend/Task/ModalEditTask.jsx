import React, { useEffect, useState } from "react";
import Select from "react-select";
import moment from "moment";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import * as taskSlice from "../Task/taskSlice";
import { api } from "../services/api";
import { toast } from "react-toastify";
export default function ModalEditTask() {
  const task = useSelector((state) => state.task.editTask);
  const dispatch = useDispatch();

  const [userTag, setUserTag] = useState([]);

  const [editTask, setEditTask] = useState({
    id: 0,
    name: "",
    priority: 200,
    start_date: new Date(),
    end_date: "",
    user_tag: null,
    status: 100,
    hash_tag: null,
    description: null,
  });
  useEffect(() => {
    setEditTask({
      id: task.id,
      name: task.name,
      priority: task.priority,
      start_date: task.start_date,
      end_date: task.end_date,
      user_tag: task.user_tag,
      status: task.status,
      hash_tag: task.hash_tag,
      description: task.description,
    });
  }, [task]);

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

    setEditTask({ ...editTask, [key]: val });
  };

  const onChangeUserTag = (e) => {
    setEditTask({ ...editTask, user_tag: JSON.stringify(e) });
  };

  const onChangeHashTag = (e) => {
    setEditTask({ ...editTask, hash_tag: JSON.stringify(e) });
  };

  const editTaskSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.updateTask(task.id, editTask);
      if (response) {
        dispatch(taskSlice.actions.createTask(response.data.data));
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
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
      id="editModal"
      tabIndex={-1}
      aria-labelledby="editModal"
      aria-hidden="true"
      className="modal fade hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full"
    >
      <div className="modal-dialog relative p-4 mx-24 my-12 w-full max-w-7xl h-full md:h-auto">
        <div className="modal-content relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex justify-between items-center p-5 rounded-t border-b dark:border-gray-600">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Edit Task
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
          <div className="mx-8 my-8">
            <form onSubmit={editTaskSubmit}>
              <div className="grid gap-6 mb-6 lg:grid-cols-2">
                <div>
                  <label
                    htmlFor="Name Task"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Task
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={editTask.name}
                    onChange={(e) => handleInputTask(e)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Task"
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
                    value={editTask.priority}
                    onChange={(e) => handleInputTask(e)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="200">Medium Priority</option>
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
                        selected={new Date(editTask.start_date)}
                        selectsStart
                        startDate={new Date(editTask.start_date)}
                        minDate={new Date(editTask.start_date)}
                        endDate={new Date(editTask.end_date)}
                        onChange={(date) =>
                          setEditTask({
                            ...editTask,
                            start_date: moment(date).format("YYYY-MM-DD"),
                          })
                        }
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                      <p className="mt-2 absolute text-sm text-red-600 dark:text-red-500"></p>
                    </div>
                    <span className="mx-4 text-gray-500">to</span>
                    <div className="relative">
                      <DatePicker
                        placeholderText="end date"
                        selected={
                          editTask.end_date == ""
                            ? new Date()
                            : new Date(editTask.end_date)
                        }
                        selectsEnd
                        startDate={new Date(editTask.start_date)}
                        endDate={new Date(editTask.end_date)}
                        minDate={new Date(editTask.start_date)}
                        onChange={(date) =>
                          setEditTask({
                            ...editTask,
                            end_date: moment(date).format("YYYY-MM-DD"),
                          })
                        }
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                    options={userTag}
                    onChange={onChangeUserTag}
                    value={JSON.parse(editTask.user_tag)}
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
                    value={editTask.status}
                    onChange={(e) => handleInputTask(e)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="100">Pendding</option>
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
                    value={JSON.parse(editTask.hash_tag)}
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
                rows="4"
                value={editTask.description}
                onChange={(e) => handleInputTask(e)}
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Description..."
              ></textarea>

              <button
                type="submit"
                data-bs-dismiss="modal"
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
