import localAxios from "./common";

const login = (data) => localAxios.post("/api/login", data);

const register = (data) => localAxios.post("/api/register", data);

const logout = () => localAxios.post("/api/logout");

const createTask = (data) => localAxios.post("/api/task", data);

const fetchTask = () => localAxios.get("/api/task");

const searchTask = (name) => localAxios.get(`/api/task/search/${name}`);

const getAllUser = () => localAxios.get("api/user");

const createTodoTask = (data) => localAxios.post("/api/todotask", data);

const changeStatusTodoTask = (id) =>
  localAxios.patch(`/api/todotask/completed/${id}`);

const updateTask = (id, data) => localAxios.put(`/api/task/${id}`, data);

const deleteTask = (id) => localAxios.delete(`api/task/${id}`);

const deleteTodoTask = (id) => localAxios.delete(`api/todotask/${id}`);

const createMeeting = (data) => localAxios.post("api/meeting", data);

const fetchMeeting = () => localAxios.get("/api/meeting");

const deleteMeeting = (meeting_id) =>
  localAxios.delete(`/api/meeting/${meeting_id}`);

const createEvent = (data) => localAxios.post("/api/calendar", data);

const fetchEvent = () => localAxios.get("/api/calendar");

const deleteEvent = (event_id) =>
  localAxios.delete(`/api/calendar/${event_id}`);

export const api = {
  login,
  register,
  logout,
  createTask,
  fetchTask,
  searchTask,
  getAllUser,
  createTodoTask,
  changeStatusTodoTask,
  updateTask,
  deleteTask,
  deleteTodoTask,
  createMeeting,
  fetchMeeting,
  deleteMeeting,
  createEvent,
  fetchEvent,
  deleteEvent,
};
