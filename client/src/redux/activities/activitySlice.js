import { createSlice } from "@reduxjs/toolkit";
import { addActivityThunk, getUserActivities, removeActivityThunk } from "./activityActions";

export const activitySlice = createSlice({
  name: "activity",
  initialState: {
    activities: [],
  },
  reducers: {},
  extraReducers: async (builder) => {
    builder.addCase(getUserActivities.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserActivities.fulfilled, (state, action) => {
      state.activities = action.payload.activities;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(getUserActivities.rejected, (state, action) => {
      console.log("rejected getUserActivities");
      state.loading = false;
      state.error = action.error.message || null;
    });
    builder.addCase(removeActivityThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(removeActivityThunk.fulfilled, (state, action) => {
      const activityId = action.payload._id;
      state.activities = state.activities.filter(activity => activity._id !== activityId);
      state.loading = false;
      state.error = null;
    });
    builder.addCase(removeActivityThunk.rejected, (state, action) => {
      console.log("rejected removeActivity");
      state.loading = false;
      state.error = action.error.message || null;
    });

  },
});



export default activitySlice.reducer;