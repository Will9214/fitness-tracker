import { createSlice } from "@reduxjs/toolkit";
import { addActivityThunk, getUserActivities } from "./activityActions";

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
  },
});



export default activitySlice.reducer;