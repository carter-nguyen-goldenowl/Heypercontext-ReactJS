import React, { useState } from "react";
import moment from "moment";
import TodoTask from "./TodoTask/TodoTask";
import { Progress } from "antd";
import Options from "./Options";

export default function FetchTask(props) {
  const hash_tag = JSON.parse(props.data.hash_tag);
  const user_tag = JSON.parse(props.data.user_tag);
  const percent =
    Math.round((props.data.sum_done / props.data.sum_todo) * 100 * 100) / 100;
  return (
    <div className="w-full sm:w-1/2 xl:w-1/3">
      <div className="mb-4">
        <div className="shadow-lg rounded-2xl p-4 bg-white dark:bg-gray-700 w-11/12 ml-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <svg
                width={35}
                height={30}
                viewBox="0 0 256 366"
                version="1.1"
                preserveAspectRatio="xMidYMid"
              >
                <defs>
                  <linearGradient
                    x1="12.5189534%"
                    y1="85.2128611%"
                    x2="88.2282959%"
                    y2="10.0225497%"
                    id="linearGradient-1"
                  >
                    <stop
                      stopColor="#FF0057"
                      stopOpacity="0.16"
                      offset="0%"
                    ></stop>
                    <stop stopColor="#FF0057" offset="86.1354%"></stop>
                  </linearGradient>
                </defs>
                <g>
                  <path
                    d="M0,60.8538006 C0,27.245261 27.245304,0 60.8542121,0 L117.027019,0 L255.996549,0 L255.996549,86.5999776 C255.996549,103.404155 242.374096,117.027222 225.569919,117.027222 L145.80812,117.027222 C130.003299,117.277829 117.242615,130.060011 117.027019,145.872817 L117.027019,335.28252 C117.027019,352.087312 103.404567,365.709764 86.5997749,365.709764 L0,365.709764 L0,117.027222 L0,60.8538006 Z"
                    fill="#001B38"
                  ></path>
                  <circle
                    fill="url(#linearGradient-1)"
                    transform="translate(147.013244, 147.014675) rotate(90.000000) translate(-147.013244, -147.014675) "
                    cx="147.013244"
                    cy="147.014675"
                    r="78.9933938"
                  ></circle>
                  <circle
                    fill="url(#linearGradient-1)"
                    opacity="0.5"
                    transform="translate(147.013244, 147.014675) rotate(90.000000) translate(-147.013244, -147.014675) "
                    cx="147.013244"
                    cy="147.014675"
                    r="78.9933938"
                  ></circle>
                </g>
              </svg>
              <div className="flex flex-col">
                <span className="font-bold text-md text-black dark:text-white ml-2">
                  {props.data.name}
                </span>
                <span className="text-sm text-gray-500 dark:text-white ml-2">
                  By {props.data.createBy + " " + props.data.difftime}
                </span>
              </div>
            </div>
            {props.data.createBy === localStorage.getItem("auth_name") ? (
              <Options data={props.data.id} />
            ) : (
              ""
            )}
          </div>
          <div className="flex items-center justify-between mb-4 space-x-12">
            {props.data.status == 100 ? (
              <span className="px-2 py-1 flex items-center font-semibold text-xs rounded-md text-red-500 bg-gray-200">
                PENNDING
              </span>
            ) : props.data.status == 200 ? (
              <span className="px-2 py-1 flex items-center font-semibold text-xs rounded-md text-blue-500 bg-gray-200">
                PROGRESS
              </span>
            ) : (
              <span className="px-2 py-1 flex items-center font-semibold text-xs rounded-md text-green-500 bg-gray-200">
                COMPLETED
              </span>
            )}

            {props.data.priority == 100 ? (
              <span className="px-2 py-1 flex items-center font-semibold text-xs rounded-md text-blue-400 border border-blue-400  bg-white">
                LOW PRIORITY
              </span>
            ) : props.data.priority == 200 ? (
              <span className="px-2 py-1 flex items-center font-semibold text-xs rounded-md text-green-400 border border-green-400  bg-white">
                MEDIUM PRIORITY
              </span>
            ) : (
              <span className="px-2 py-1 flex items-center font-semibold text-xs rounded-md text-red-400 border border-red-400  bg-white">
                HIGH PRIORITY
              </span>
            )}
          </div>
          <div className="block m-auto">
            <div>
              <span className="text-sm inline-block text-gray-500 dark:text-gray-100">
                Task done :
                <span className="text-gray-700 dark:text-white font-bold">
                  {props.data.sum_done}
                </span>
                /{props.data.sum_todo}
              </span>
            </div>
            <Progress percent={percent} className="white-text" />
          </div>
          <div className="flex items-center justify-start my-4 space-x-4">
            {hash_tag.map((tag) => (
              <span className=" relative px-2 py-1 flex items-center text-xs rounded-md font-semibold text-blue-500 bg-blue-50">
                {tag.label}
              </span>
            ))}
          </div>
          <div className="flex items-center justify-start my-4 space-x-4">
            {user_tag.map((user) => (
              <span className=" relative px-2 py-1 flex items-center text-xs rounded-md font-semibold text-green-500 bg-blue-50">
                {user.value}
              </span>
            ))}
          </div>
          <div className=" dark:text-white mt-4">{props.data.description}</div>
          <span className="px-2 py-1 flex w-36 mt-4 items-center text-xs rounded-md font-semibold text-yellow-500 bg-yellow-100">
            START DATE: {moment(props.data.start_date).format("DD MMM")} DUE
            DATE: {moment(props.data.end_date).format("DD MMM")}
          </span>
        </div>
      </div>
      <TodoTask
        task_id={props.data.id}
        listTodo={props.data.todo_tasks}
        sum_todo={props.data.sum_todo}
      />
    </div>
  );
}
