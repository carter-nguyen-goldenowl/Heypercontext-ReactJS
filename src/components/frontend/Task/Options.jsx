import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as taskSlice from "../Task/taskSlice";

export default function Options(props) {
  const dispatch = useDispatch();
  const listTask = useSelector((state) => state.task.listTask);
  const task = listTask.find((task) => task.id === props.data);
  const handleEditTask = () => {
    dispatch(taskSlice.actions.handleEditData(task));
  };

  return (
    <div className="flex items-center">
      <button
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#editModal"
        onClick={handleEditTask}
        className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-2 py-1.5 mb-2 mr-1 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
      >
        Edit
      </button>
      <button
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#deleteModal"
        onClick={handleEditTask}
        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-1.5 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
      >
        Delete
      </button>
    </div>
  );
}
