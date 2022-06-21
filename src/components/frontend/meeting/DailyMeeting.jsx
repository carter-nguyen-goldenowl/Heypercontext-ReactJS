import React from "react";
import { DatePicker } from "antd";
import { useState } from "react";
import moment from "moment";

export default function DailyMeeting(props) {
  const currentDate = moment();
  const [startDate, setStartDate] = useState(
    currentDate.startOf("week").toDate()
  );
  return (
    <div className="container mx-auto">
      <div className="wrapper bg-white rounded shadow w-full overflow-auto">
        <div className="header flex justify-between border-b p-2">
          <span className="text-lg font-bold">
            {moment(startDate).format("YYYY MMMM")}
          </span>
          <div>
            <DatePicker
              picker="week"
              bordered={false}
              onChange={(date) => {
                setStartDate(date.startOf("week").toDate());
              }}
            />
          </div>
        </div>

        <table className="w-full">
          <thead>
            <tr>
              <th className="p-2 border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs">
                <span className="xl:block lg:block md:block sm:block hidden">
                  Sunday
                </span>
                <span className="xl:hidden lg:hidden md:hidden sm:hidden block">
                  Sun
                </span>
              </th>
              <th className="p-2 border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs">
                <span className="xl:block lg:block md:block sm:block hidden">
                  Monday
                </span>
                <span className="xl:hidden lg:hidden md:hidden sm:hidden block">
                  Mon
                </span>
              </th>
              <th className="p-2 border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs">
                <span className="xl:block lg:block md:block sm:block hidden">
                  Tuesday
                </span>
                <span className="xl:hidden lg:hidden md:hidden sm:hidden block">
                  Tue
                </span>
              </th>
              <th className="p-2 border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs">
                <span className="xl:block lg:block md:block sm:block hidden">
                  Wednesday
                </span>
                <span className="xl:hidden lg:hidden md:hidden sm:hidden block">
                  Wed
                </span>
              </th>
              <th className="p-2 border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs">
                <span className="xl:block lg:block md:block sm:block hidden">
                  Thursday
                </span>
                <span className="xl:hidden lg:hidden md:hidden sm:hidden block">
                  Thu
                </span>
              </th>
              <th className="p-2 border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs">
                <span className="xl:block lg:block md:block sm:block hidden">
                  Friday
                </span>
                <span className="xl:hidden lg:hidden md:hidden sm:hidden block">
                  Fri
                </span>
              </th>
              <th className="p-2 border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs">
                <span className="xl:block lg:block md:block sm:block hidden">
                  Saturday
                </span>
                <span className="xl:hidden lg:hidden md:hidden sm:hidden block">
                  Sat
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center h-screen">
              <td className="border p-1 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 overflow-hidden transition cursor-pointer duration-500 ease hover:bg-gray-300 ">
                {props.data.map((meeting) => (
                  <>
                    {moment(meeting.start_time).week() ===
                      moment(startDate).week() &&
                    moment(meeting.start_time).isoWeekday() === 7 ? (
                      <div className="xl:w-40 lg:w-30 md:w-30 sm:w-full w-10 mx-auto overflow-hidden">
                        <div className="bottom flex-grow h-30 py-1 w-full cursor-pointer">
                          <div className="event bg-blue-400 text-white rounded p-1 text-sm mb-1">
                            <span className="event-name">
                              {meeting.topic}{" "}
                              {moment(meeting.start_time).format("hh:mm") +
                                "~" +
                                moment(meeting.start_time)
                                  .add(meeting.duration, "minutes")
                                  .format("hh:mm")}
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </>
                ))}
              </td>
              <td className="border p-1 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto transition cursor-pointer duration-500 ease hover:bg-gray-300">
                {props.data.map((meeting) => (
                  <>
                    {moment(meeting.start_time).week() ===
                      moment(startDate).week() &&
                    moment(meeting.start_time).isoWeekday() === 1 ? (
                      <div className="xl:w-40 lg:w-30 md:w-30 sm:w-full w-10 mx-auto overflow-hidden">
                        <div className="bottom flex-grow h-30 py-1 w-full cursor-pointer">
                          <div className="event bg-blue-400 text-white rounded p-1 text-sm mb-1">
                            <span className="event-name">
                              {meeting.topic}{" "}
                              {moment(meeting.start_time).format("hh:mm") +
                                "~" +
                                moment(meeting.start_time)
                                  .add(meeting.duration, "minutes")
                                  .format("hh:mm")}
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </>
                ))}
              </td>
              <td className="border p-1 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto transition cursor-pointer duration-500 ease hover:bg-gray-300">
                {props.data.map((meeting) => (
                  <>
                    {moment(meeting.start_time).week() ===
                      moment(startDate).week() &&
                    moment(meeting.start_time).isoWeekday() === 2 ? (
                      <div className="xl:w-40 lg:w-30 md:w-30 sm:w-full w-10 mx-auto overflow-hidden">
                        <div className="bottom flex-grow h-30 py-1 w-full cursor-pointer">
                          <div className="event bg-blue-400 text-white rounded p-1 text-sm mb-1">
                            <span className="event-name">
                              {meeting.topic}{" "}
                              {moment(meeting.start_time).format("hh:mm") +
                                "~" +
                                moment(meeting.start_time)
                                  .add(meeting.duration, "minutes")
                                  .format("hh:mm")}
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </>
                ))}
              </td>
              <td className=" relative border p-1 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto transition cursor-pointer duration-500 ease hover:bg-gray-300">
                {props.data.map((meeting) => (
                  <>
                    {moment(meeting.start_time).week() ===
                      moment(startDate).week() &&
                    moment(meeting.start_time).isoWeekday() === 3 ? (
                      <div className=" xl:w-40 lg:w-30 md:w-30 sm:w-full w-10 mx-auto overflow-hidden">
                        <div className="bottom flex-grow h-30 py-1 w-full cursor-pointer">
                          <div className="event bg-blue-400 text-white rounded p-1 text-sm mb-1">
                            <span className="event-name">
                              {meeting.topic}{" "}
                              {moment(meeting.start_time).format("hh:mm") +
                                "~" +
                                moment(meeting.start_time)
                                  .add(meeting.duration, "minutes")
                                  .format("hh:mm")}
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </>
                ))}
              </td>
              <td className="border p-1 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto transition cursor-pointer duration-500 ease hover:bg-gray-300">
                {props.data.map((meeting) => (
                  <>
                    {moment(meeting.start_time).week() ===
                      moment(startDate).week() &&
                    moment(meeting.start_time).isoWeekday() === 4 ? (
                      <div className="xl:w-40 lg:w-30 md:w-30 sm:w-full w-10 mx-auto overflow-hidden">
                        <div className="bottom flex-grow h-30 py-1 w-full cursor-pointer">
                          <div className="event bg-blue-400 text-white rounded p-1 text-sm mb-1">
                            <span className="event-name">
                              {meeting.topic}{" "}
                              {moment(meeting.start_time).format("hh:mm") +
                                "~" +
                                moment(meeting.start_time)
                                  .add(meeting.duration, "minutes")
                                  .format("hh:mm")}
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </>
                ))}
              </td>
              <td className="border p-1 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 overflow-hidden transition cursor-pointer duration-500 ease hover:bg-gray-300">
                {props.data.map((meeting) => (
                  <>
                    {moment(meeting.start_time).week() ===
                      moment(startDate).week() &&
                    moment(meeting.start_time).isoWeekday() === 5 ? (
                      <div className="xl:w-40 lg:w-30 md:w-30 sm:w-full w-10 mx-auto overflow-hidden">
                        <div className="bottom flex-grow h-30 py-1 w-full cursor-pointer">
                          <div className="event bg-blue-400 text-white rounded p-1 text-sm mb-1">
                            <span className="event-name">
                              {meeting.topic}{" "}
                              {moment(meeting.start_time).format("hh:mm") +
                                "~" +
                                moment(meeting.start_time)
                                  .add(meeting.duration, "minutes")
                                  .format("hh:mm")}
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </>
                ))}
              </td>
              <td className="border p-1 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto transition cursor-pointer duration-500 ease hover:bg-gray-300">
                {props.data.map((meeting) => (
                  <>
                    {moment(meeting.start_time).week() ===
                      moment(startDate).week() &&
                    moment(meeting.start_time).isoWeekday() === 6 ? (
                      <div className="xl:w-40 lg:w-30 md:w-30 sm:w-full w-10 mx-auto overflow-hidden">
                        <div className="bottom flex-grow h-30 py-1 w-full cursor-pointer">
                          <div className="event bg-blue-400 text-white rounded p-1 text-sm mb-1">
                            <span className="event-name">
                              {meeting.topic}{" "}
                              {moment(meeting.start_time).format("hh:mm") +
                                "~" +
                                moment(meeting.start_time)
                                  .add(meeting.duration, "minutes")
                                  .format("hh:mm")}
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </>
                ))}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
