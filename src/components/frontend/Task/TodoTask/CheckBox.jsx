import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { api } from "../../services/api";
import * as taskSlice from "../taskSlice";

export default function CheckBox(props) {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
  const handleCheckbox = async () => {
    setChecked(!checked);
    try {
      const response = await api.changeStatusTodoTask(props.todo_task.id);
      if (response) {
        dispatch(taskSlice.actions.changeStatusTodoTask(response.data.data));
      }
    } catch (error) {
      toast.error(error.response.data.message);
      setChecked(checked);
    }
  };
  return (
    <input
      type="checkbox"
      onChange={() => handleCheckbox()}
      checked={checked}
      className="w-4 h-4 mr-3 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
    />
  );
}
