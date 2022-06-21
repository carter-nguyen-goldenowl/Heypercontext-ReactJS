import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Nabar from "../home/Nabar";
import Navigation from "../home/Navigation";
import { api } from "../services/api";
import ModalNewMeeting from "./ModalNewMeeting";
import * as meetingSlice from "../meeting/meetingSlice";
import moment from "moment";
import { toast } from "react-toastify";
import { useState } from "react";
import { Link } from "react-router-dom";
import DailyMeeting from "./DailyMeeting";

export default function Meeting() {
  const dispatch = useDispatch();
  const meeting = useSelector((state) => state.meeting.meeting);
  const listMeeting = useSelector((state) => state.meeting.listMeeting);
  const [check, setCheck] = useState(false);
  async function fetchData() {
    try {
      const response = await api.fetchMeeting();
      dispatch(meetingSlice.actions.fetchMeeting(response.data.data));
    } catch (error) {}
  }
  const deleteMeeting = async (meeting_id) => {
    try {
      const response = await api.deleteMeeting(meeting_id);
      if (response.data.data === true) {
        dispatch(meetingSlice.actions.deleteMeeting(meeting_id));
        toast.success(response.data.message);
      }
    } catch (error) {}
  };
  useEffect(() => {
    fetchData();
  }, [meeting]);

  const handleListCheck = () => {
    setCheck(false);
  };

  const handleDailyCheck = () => {
    setCheck(true);
  };
  return (
    <main className="bg-gray-100 dark:bg-gray-800 rounded-2xl h-screen overflow-hidden relative">
      <div className="flex items-start justify-between">
        <Navigation />
        <div className="flex flex-col w-full pl-0 md:p-4 md:space-y-4">
          <Nabar />
          <div>
            <button
              className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 ml-10 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#newmeeting"
            >
              New Meeting
            </button>
            <ModalNewMeeting />
            <div className="my-4">
              <Link className="px-5 py-2.5" onClick={() => handleListCheck()}>
                List Meeting
              </Link>
              <Link className="px-5 py-2.5" onClick={() => handleDailyCheck()}>
                Daily Meeting
              </Link>
            </div>
          </div>
          {check === false ? (
            <div>
              <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" class="px-6 py-3">
                        Meeting ID
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Topic
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Time
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Create By
                      </th>
                      <th scope="col" class="px-6 py-3">
                        <span class="sr-only">Start URL</span>
                      </th>
                      <th scope="col" class="px-6 py-3">
                        <span class="sr-only">Join URL</span>
                      </th>
                      <th scope="col" class="px-6 py-3">
                        <span class="sr-only">action</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {listMeeting.map((meeting) => (
                      <tr
                        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        key={meeting.id}
                      >
                        <td class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                          {meeting.meeting_id}
                        </td>
                        <td class="px-6 py-4 dark:text-white">
                          {meeting.topic}
                        </td>
                        <td class="px-6 py-4 dark:text-white">
                          {moment(meeting.start_time).format("dd DD MMM") +
                            " from " +
                            moment(meeting.start_time).format("hh:mm") +
                            " to " +
                            moment(meeting.start_time)
                              .add(meeting.duration, "minutes")
                              .format("hh:mm")}
                        </td>
                        <td class="px-6 py-4 dark:text-white">
                          {meeting.user_name + " " + meeting.difftime}
                        </td>
                        {meeting.user_name ===
                        localStorage.getItem("auth_name") ? (
                          <td class="px-6 py-4 text-right ">
                            <a
                              href={meeting.start_url}
                              class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                            >
                              Start
                            </a>
                          </td>
                        ) : (
                          <td></td>
                        )}
                        <td class="px-6 py-4 text-right">
                          <a
                            href={meeting.join_url}
                            class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          >
                            Join
                          </a>
                        </td>
                        {meeting.user_name ===
                        localStorage.getItem("auth_name") ? (
                          <td class="px-6 py-4 text-right">
                            <button
                              type="button"
                              onClick={() => deleteMeeting(meeting.meeting_id)}
                              className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-1.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                            >
                              Delete
                            </button>
                          </td>
                        ) : (
                          <td></td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <DailyMeeting data={listMeeting} />
          )}
        </div>
      </div>
    </main>
  );
}
