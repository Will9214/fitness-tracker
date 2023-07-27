import { createSlice } from "@reduxjs/toolkit";
import { addActivityThunk } from "./activityActions";

export const activitySlice = createSlice({
  name: "activity",
  initialState: {
    activities: [],
  },
  reducers: {
    getUserActivities: (state, { payload }) => {
      state.activities = payload.activities;
    },
  },
  extraReducers: {},
});

export const { getUserActivities } = activitySlice.actions;

export default activitySlice.reducer;