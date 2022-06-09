import { configureStore } from "@reduxjs/toolkit";
import * as authSlice from "../components/frontend/auth/authSlice";
import * as taskSlice from "../components/frontend/Task/taskSlice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    task: taskSlice.reducer,
  },
});

export default store;
