import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    email: "",
    token: "",
  },
  isLogin: false,
};

const login = (state, action) => {
  state.user.name = action.payload.username;
  state.user.email = action.payload.email;
  state.user.token = action.payload.token;
  state.user.link_avt = action.payload.link_avt;
  state.isLogin = true;
};

const register = (state, action) => {
  state.user.email = action.payload;
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login,
    register,
  },
});

export const { actions, reducer } = authSlice;
