import { configureStore } from "@reduxjs/toolkit";
import * as authSlice from "../components/frontend/auth/authSlice";
import * as taskSlice from "../components/frontend/Task/taskSlice";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const reducers = combineReducers({
  auth: authSlice.reducer,
  task: taskSlice.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
});

export default store;
