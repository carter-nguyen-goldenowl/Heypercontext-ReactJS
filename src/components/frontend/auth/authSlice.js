import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export default createSlice({
  name: "auth",
  initialState: {
    status: "idle",
    listUser: [],
    listError: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.rejected, (state, action) => {
        state.listError = "Invalid Credentials";
        state.status = "idle";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.listUser = action.payload;
        state.status = "idle";
      });
  },
});

export const login = createAsyncThunk("auth/login", async (data) => {
  const res = await axios.post("/api/login", data);
  if (res) {
    return res.data;
  }
});

export const register = createAsyncThunk("auth/register", async (data) => {
  const res = await axios.post("api/register", data);
  if (res) {
    return res.data;
  }
});
