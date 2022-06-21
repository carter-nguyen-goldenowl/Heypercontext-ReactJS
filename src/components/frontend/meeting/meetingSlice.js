import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  meeting: {
    meeting_id: "",
    user_id: "",
    topic: "",
    start_time: "",
    duration: "",
    start_url: "",
    join_url: "",
  },
  listMeeting: [],
};

const createMeeting = (state, action) => {
  state.meeting.meeting_id = action.payload.meeting_id;
  state.meeting.user_id = action.payload.user_id;
  state.meeting.topic = action.payload.topic;
  state.meeting.start_time = action.payload.start_time;
  state.meeting.duration = action.payload.duration;
  state.meeting.start_url = action.payload.start_url;
  state.meeting.join_url = action.payload.join_url;
};

const fetchMeeting = (state, action) => {
  state.listMeeting = action.payload;
};

const deleteMeeting = (state, action) => {
  state.listMeeting = state.listMeeting.filter(
    (meeting) => meeting.meeting_id !== action.payload
  );
};

const meetingSlice = createSlice({
  name: "meeting",
  initialState,
  reducers: {
    createMeeting,
    fetchMeeting,
    deleteMeeting,
  },
});

export const { actions, reducer } = meetingSlice;
