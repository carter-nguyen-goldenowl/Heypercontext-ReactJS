import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../components/frontend/auth/authSlice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

export default store;
