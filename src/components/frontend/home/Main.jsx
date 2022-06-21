import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../services/api";
import FetchTask from "../Task/FetchTask";
import * as taskSlice from "../Task/taskSlice";

export default function Main() {
  const dispatch = useDispatch();
  const listTask = useSelector((state) => state.task.listTask);
  const task = useSelector((state) => state.task.newTask);
  const flag = useSelector((state) => state.task.flag);
  const todoTask = useSelector((state) => state.task.newTodoTask);

  async function fetchData() {
    const response = await api.fetchTask();
    dispatch(taskSlice.actions.fetchTask(response.data.data));
  }
  useEffect(() => {
    fetchData();
  }, [task, todoTask, flag]);

  return (
    <div className="overflow-auto h-screen pb-24 pt-2 pr-2 pl-2 md:pt-0 md:pr-0 md:pl-0">
      <div className="flex flex-col flex-wrap sm:flex-row ">
        {listTask !== [] ? (
          listTask.map((task) => <FetchTask data={task} />)
        ) : (
          <div className=" dark:text-white">Tạo mới task</div>
        )}
      </div>
    </div>
  );
}
