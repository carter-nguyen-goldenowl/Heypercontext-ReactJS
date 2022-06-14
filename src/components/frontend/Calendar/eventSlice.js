import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  event: {
    event_id: "",
    user_id: 0,
    name: "",
    start_time: "",
    end_time: "",
  },
  listEvent: [],
};

const createEvent = (state, action) => {
  state.event.event_id = action.payload.event_id;
  state.event.user_id = action.payload.user_id;
  state.event.name = action.payload.name;
  state.event.start_time = action.payload.start_time;
  state.event.end_time = action.payload.end_time;
};

const fetchEvent = (state, action) => {
  state.listEvent = action.payload;
};

const deleteEvent = (state, action) => {
  state.listEvent = state.listEvent.filter(
    (event) => event.event_id !== action.payload
  );
};

const eventSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    createEvent,
    fetchEvent,
    deleteEvent,
  },
});

export const { actions, reducer } = eventSlice;
