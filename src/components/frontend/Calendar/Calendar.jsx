import React from "react";
import Nabar from "../home/Nabar";
import Navigation from "../home/Navigation";
import ModalCalendar from "./ModalCalendar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { api } from "../services/api";
import * as eventSlice from "./eventSlice";
import moment from "moment";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useState } from "react";
import DailyEvent from "./DailyEvent";

export default function Calendar() {
  const dispatch = useDispatch();
  const event = useSelector((state) => state.calendar.event);
  const listEvent = useSelector((state) => state.calendar.listEvent);
  const [check, setCheck] = useState(false);
  async function fetchData() {
    try {
      const response = await api.fetchEvent();
      if (response) {
        dispatch(eventSlice.actions.fetchEvent(response.data.data));
      }
    } catch (error) {}
  }

  const deleteEvent = async (event_id) => {
    try {
      const response = await api.deleteEvent(event_id);
      if (response.data.data === true) {
        dispatch(eventSlice.actions.deleteEvent(event_id));
        toast.success(response.data.message);
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchData();
  }, [event]);

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
              data-bs-target="#newcalendar"
            >
              New Event
            </button>
            <ModalCalendar />
            <div className="my-4">
              <Link className="px-5 py-2.5" onClick={() => handleListCheck()}>
                List Event
              </Link>
              <Link className="px-5 py-2.5" onClick={() => handleDailyCheck()}>
                Daily Event
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
                        Name Event
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Start Date Time
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Start End Time
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Create By
                      </th>
                      <th scope="col" class="px-6 py-3">
                        <span class="sr-only">URL</span>
                      </th>
                      <th scope="col" class="px-6 py-3">
                        <span class="sr-only">action</span>
                      </th>
                      <th scope="col" class="px-6 py-3">
                        <span class="sr-only">action</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {listEvent.map((event) => (
                      <tr
                        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        key={event.id}
                      >
                        <td class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                          {event.name}
                        </td>
                        <td class="px-6 py-4 dark:text-white">
                          {moment(event.start_time).format("ddd DD MMMM") +
                            " " +
                            moment(event.start_time).format("hh:mm")}
                        </td>
                        <td class="px-6 py-4 dark:text-white">
                          {moment(event.end_time).format("ddd DD MMMM") +
                            " " +
                            moment(event.end_time).format("hh:mm")}
                        </td>
                        <td class="px-6 py-4 dark:text-white">
                          {event.user_name + " " + event.difftime}
                        </td>
                        {event.user_name ===
                        localStorage.getItem("auth_name") ? (
                          <td class="px-6 py-4 text-right ">
                            <a
                              href={event.link}
                              class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                            >
                              Go To Google Calendar
                            </a>
                          </td>
                        ) : (
                          <td></td>
                        )}
                        {event.user_name ===
                        localStorage.getItem("auth_name") ? (
                          <td class="px-6 py-4 text-right">
                            <button
                              type="button"
                              onClick={() => deleteEvent(event.event_id)}
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
            <DailyEvent data={listEvent} />
          )}
        </div>
      </div>
    </main>
  );
}
