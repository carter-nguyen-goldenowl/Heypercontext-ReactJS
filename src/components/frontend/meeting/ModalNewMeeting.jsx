import React, { useState } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import { api } from "../services/api";
import { useDispatch } from "react-redux";
import * as meetingSlice from "../meeting/meetingSlice";
import { toast } from "react-toastify";

export default function ModalNewMeeting() {
  const dispatch = useDispatch();
  const [meeting, setMeeting] = useState({
    topic: localStorage.getItem("auth_name") + " Zoom Meeting",
    password: "",
    duration: 30,
    start_time: new Date(),
  });

  const SubmitMeeting = async (e) => {
    e.preventDefault();

    const data = {
      topic: meeting.topic,
      password: meeting.password,
      duration: meeting.duration,
      start_time: moment(meeting.start_time).format("YYYY-MM-DD hh:mm:ss"),
      timezone: "Asia/Ho_Chi_Minh",
    };

    try {
      const response = await api.createMeeting(data);
      dispatch(meetingSlice.actions.createMeeting(response.data.data));
      toast.success(response.data.message);
      setMeeting({
        ...meeting,
        topic: "",
        password: "",
        duration: 30,
        start_time: new Date(),
      });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div
      id="newmeeting"
      tabIndex={-1}
      aria-labelledby="newmeeting"
      aria-hidden="true"
      className="modal fade hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full"
    >
      <div className="modal-dialog relative p-4 mx-auto my-32 w-full max-w-2xl h-full md:h-auto">
        <div className="modal-content relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              New Meeting
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
          <form onSubmit={SubmitMeeting}>
            <div className=" mx-8 my-8">
              <div className="grid gap-6 mb-6 lg:grid-cols-2">
                <div>
                  <label
                    htmlFor="Name Task"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Topic Meeting
                  </label>
                  <input
                    type="text"
                    name="topic"
                    value={meeting.topic}
                    onChange={(e) =>
                      setMeeting({ ...meeting, topic: e.target.value })
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Topic"
                    required
                  />
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500"></p>
                </div>
                <div>
                  <label
                    htmlFor="Name Task"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={meeting.password}
                    onChange={(e) =>
                      setMeeting({ ...meeting, password: e.target.value })
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="123"
                    required
                  />
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500"></p>
                </div>
                <div>
                  <label
                    htmlFor="priority"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Duration
                  </label>
                  <select
                    id="duration"
                    name="duration"
                    value={meeting.duration}
                    onChange={(e) =>
                      setMeeting({ ...meeting, duration: e.target.value })
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="15">15 Minutes</option>
                    <option value="30" selected>
                      30 Minutes
                    </option>
                    <option value="45">45 Minutes</option>
                    <option value="60">60 Minutes</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="Start Time"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Start time
                  </label>
                  <DatePicker
                    placeholderText="start time"
                    selected={meeting.start_time}
                    showTimeSelect
                    dateFormat="MMMM d, yyyy h:mmaa"
                    onChange={(date) =>
                      setMeeting({
                        ...meeting,
                        start_time: date,
                      })
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
