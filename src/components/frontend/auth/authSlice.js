import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export default createSlice({
  name: "auth",
  initialState: {
    status: "idle",
    listUser: [],
    listError: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.listUser = action.payload;
        state.status = "idle";
      })
      .addCase(login.rejected, (state, action) => {
        state.listError = action.payload;
        state.status = "idle";
      });
  },
});

export const login = createAsyncThunk("login", async (data) => {
  const res = await axios.post("/api/login", data).catch((error) => {
    // console.log("erorr here");
    return error;
  });
  console.log("res here");
  return res.data;
});
