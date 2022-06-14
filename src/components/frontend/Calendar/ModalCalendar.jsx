import moment from "moment";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import { api } from "../services/api";
import * as eventSlice from "../Calendar/eventSlice";
import { toast } from "react-toastify";

export default function ModalCalendar() {
  const dispatch = useDispatch();
  const [event, setEvent] = useState({
    name: "",
    start_time: new Date(),
    end_time: null,
    list_errors: [],
  });

  const submitEvent = async (e) => {
    e.preventDefault();

    const data = {
      name: event.name,
      start_date: moment(event.start_time).format("YYYY-MM-DD hh:mm:ss"),
      end_date:
        event.end_time !== null
          ? moment(event.end_time).format("YYYY-MM-DD hh:mm:ss")
          : null,
      start_time: {
        year: moment(event.start_time).format("YYYY"),
        month: moment(event.start_time).format("MM"),
        day: moment(event.start_time).format("DD"),
        hour: moment(event.start_time).format("hh"),
        minute: moment(event.start_time).format("mm"),
        second: moment(event.start_time).format("ss"),
      },
      end_time: {
        year: moment(event.end_time).format("YYYY"),
        month: moment(event.end_time).format("MM"),
        day: moment(event.end_time).format("DD"),
        hour: moment(event.end_time).format("hh"),
        minute: moment(event.end_time).format("mm"),
        second: moment(event.end_time).format("ss"),
      },
    };

    try {
      const response = await api.createEvent(data);
      console.log(response);
      if (response) {
        dispatch(eventSlice.actions.createEvent(response.data.data));
        toast.success(response.data.message);
        setEvent({
          name: "",
          start_time: new Date(),
          end_time: null,
          list_errors: [],
        });
      }
    } catch (error) {
      setEvent({
        ...event,
        list_errors: error.response.data.errors,
      });
    }
  };
  return (
    <div
      id="newcalendar"
      tabIndex={-1}
      aria-labelledby="newcalendar"
      aria-hidden="true"
      className="modal fade hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full"
    >
      <div className="modal-dialog relative p-4 mx-auto my-32 w-full max-w-2xl h-full md:h-auto">
        <div className="modal-content relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              New Event
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
          <form onSubmit={submitEvent}>
            <div className=" mx-8 my-8">
              <div>
                <label
                  htmlFor="Name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Name Event
                </label>
                <input
                  type="text"
                  name="name"
                  value={event.name}
                  onChange={(e) => setEvent({ ...event, name: e.target.value })}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name event"
                />
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  {event.list_errors.name}
                </p>
              </div>
              <div className="grid gap-6 mb-6 lg:grid-cols-2">
                <div>
                  <label
                    htmlFor="Start Time"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Start time
                  </label>
                  <DatePicker
                    placeholderText="start time"
                    selected={event.start_time}
                    selectsStart
                    showTimeSelect
                    dateFormat="MMMM d, yyyy h:mmaa"
                    minDate={event.start_time}
                    startDate={event.start_time}
                    endDate={event.end_time}
                    onChange={(date) =>
                      setEvent({
                        ...event,
                        start_time: date,
                      })
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="End Time"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    End time
                  </label>
                  <DatePicker
                    placeholderText="end time"
                    selected={event.end_time}
                    showTimeSelect
                    dateFormat="MMMM d, yyyy h:mmaa"
                    selectsEnd
                    startDate={event.start_time}
                    endDate={event.end_time}
                    minDate={event.start_time}
                    onChange={(date) =>
                      setEvent({
                        ...event,
                        end_time: date,
                      })
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    {event.list_errors.end_date}
                  </p>
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
