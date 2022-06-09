import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { api } from "../../services/api";
import * as taskSlice from "../taskSlice";
import CheckBox from "./CheckBox";

export default function TodoTask(props) {
  const dispatch = useDispatch();
  const [todoTask, setTodoTask] = useState("");

  const addTodoTaskSubmit = async (e) => {
    e.preventDefault();

    const data = {
      task_id: props.task_id,
      todo: todoTask,
    };
    try {
      const response = await api.createTodoTask(data);
      if (response) {
        dispatch(taskSlice.actions.createTodoTask(response.data.data));
        toast.success(response.data.message);
      }
      setTodoTask("");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const deleteTodoTask = async (id) => {
    try {
      const payload = {
        task_id: props.task_id,
        todo_id: id,
      };

      const response = await api.deleteTodoTask(id);
      if (response.data.data == true) {
        dispatch(taskSlice.actions.deleteTodoTask(payload));
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="mb-4 mx-0 sm:ml-4 xl:mr-4">
      <div className="shadow-lg rounded-2xl bg-white dark:bg-gray-700 w-full">
        <p className="font-bold text-md p-4 text-black dark:text-white">
          Sub Tasks
          <span className="text-sm text-gray-500 dark:text-white ml-2">
            ({props.sum_todo})
          </span>
        </p>
        <form onSubmit={addTodoTaskSubmit}>
          <label
            htmlFor="search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
          >
            Your Email
          </label>
          <div className="relative">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"></div>
            <input
              type="text"
              value={todoTask}
              onChange={(e) => setTodoTask(e.target.value)}
              className="block p-4 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Add TodoTask"
              required
            />
            <button
              type="submit"
              className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Add
            </button>
          </div>
        </form>
        {props.listTodo.map((todo, index) => (
          <ul key={todo.id} className="relative">
            {todo.status == 0 ? (
              <li className="flex items-center text-gray-600 dark:text-gray-200 justify-between py-3 border-b-2 border-gray-100 dark:border-gray-800">
                <div className="items-center justify-start text-sm">
                  <span className="mx-4">{index + 1}</span>
                  <span>{todo.todo}</span>
                </div>
                <div className="flex justify-between items-center ">
                  <CheckBox todo_task={todo} task_id={props.task_id} />

                  <button
                    type="button"
                    onClick={() => deleteTodoTask(todo.id)}
                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-1.5 mr-1 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ) : (
              <li className="flex items-center text-gray-400  justify-between py-3 border-b-2 border-gray-100 dark:border-gray-800">
                <div className="flex items-center justify-start text-sm">
                  <span className="mx-4">{index + 1}</span>
                  <span className="line-through">{todo.todo}</span>
                  <button
                    type="button"
                    onClick={() => deleteTodoTask(todo.id)}
                    className="absolute focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-1.5 right-1 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                  >
                    Delete
                  </button>
                </div>
              </li>
            )}
          </ul>
        ))}
      </div>
    </div>
  );
}
