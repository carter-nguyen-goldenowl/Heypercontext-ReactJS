import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  newTask: {
    name: "",
    user_id: 0,
    priority: 200,
    start_date: new Date(),
    end_date: "",
    user_tag: null,
    status: 100,
    hash_tag: null,
    description: null,
  },
  newTodoTask: {
    id: 0,
    task_id: 0,
    todotask: "",
    status: 0,
  },
  editTask: {
    id: 0,
    name: "",
    user_id: 0,
    priority: 200,
    start_date: new Date(),
    end_date: "",
    user_tag: null,
    status: 100,
    hash_tag: null,
    description: null,
  },
  listTask: [],
};

const createTask = (state, action) => {
  state.newTask.name = action.payload.name;
  state.newTask.user_id = action.payload.user_id;
  state.newTask.priority = action.payload.priority;
  state.newTask.start_date = action.payload.start_date;
  state.newTask.end_date = action.payload.end_date;
  state.newTask.user_tag = action.payload.user_tag;
  state.newTask.status = action.payload.status;
  state.newTask.hash_tag = action.payload.hash_tag;
  state.newTask.description = action.payload.description;
};

const fetchTask = (state, action) => {
  state.listTask = action.payload;
};

const createTodoTask = (state, action) => {
  state.newTodoTask.id = action.payload.id;
  state.newTodoTask.task_id = action.payload.task_id;
  state.newTodoTask.todotask = action.payload.todo;
};

const changeStatusTodoTask = (state, action) => {
  state.newTodoTask.id = action.payload.id;
  state.newTodoTask.task_id = action.payload.task_id;
  state.newTodoTask.todotask = action.payload.todo;
  state.newTodoTask.status = action.payload.status;
};

const handleEditData = (state, action) => {
  state.editTask.id = action.payload.id;
  state.editTask.name = action.payload.name;
  state.editTask.user_id = action.payload.user_id;
  state.editTask.priority = action.payload.priority;
  state.editTask.start_date = action.payload.start_date;
  state.editTask.end_date = action.payload.end_date;
  state.editTask.user_tag = action.payload.user_tag;
  state.editTask.status = action.payload.status;
  state.editTask.hash_tag = action.payload.hash_tag;
  state.editTask.description = action.payload.description;
};

const deleteTask = (state, action) => {
  state.listTask = state.listTask.filter((task) => task.id !== action.payload);
};

const deleteTodoTask = (state, action) => {
  const task = state.listTask.find(
    (task) => task.id === action.payload.task_id
  );
  task.todo_tasks = task.todo_tasks.filter(
    (todo) => todo.id !== action.payload.todo_id
  );
  state.listTask = state.listTask;
};

const searchTask = (state, action) => {
  state.listTask = action.payload;
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    createTask,
    fetchTask,
    createTodoTask,
    changeStatusTodoTask,
    handleEditData,
    deleteTask,
    deleteTodoTask,
    searchTask,
  },
});

export const { actions, reducer } = taskSlice;
