import { createSlice } from "@reduxjs/toolkit";
import { addActivityThunk, getUserActivities, removeActivityThunk, updateActivity } from "./activityActions";

export const activitySlice = createSlice({
  name: "activity",
  initialState: {
    activities: [],
  },
  reducers: {
    updateActivityReducer: (state, action) => {
      const activity = state.activities.find(
        (activity) => activity._id === action.payload.activityId
      );
    
      activity.distance = action.payload.editedActivityDistance;
      activity.time = action.payload.editedActivityTime;
      activity.weight = action.payload.editedActivityWeight;
      activity.sets = action.payload.editedActivitySets;
      activity.reps = action.payload.editedActivityReps;
      activity.description = action.payload.editedActivityDescription;
    }
  },
  extraReducers: async (builder) => {
    builder.addCase(addActivityThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addActivityThunk.fulfilled, (state, action) => {
      state.activities.push(action.payload.activity);
      state.loading = false;
      state.error = null;
    });
    builder.addCase(addActivityThunk.rejected, (state, action) => {
      console.log("rejected addActivityThunk");
      state.loading = false;
      state.error = action.error.message || null;
    });
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
    builder.addCase(updateActivity.pending, (state) =>{
      state.loading = true;
    });
    builder.addCase(updateActivity.fulfilled, (state) => {
      
      // I couldn't get this code working down here so I just made a separate reducer above, which will also require a separate dispatch in the activity component

      // const activity = state.activities.find(activity => activity._id === action.payload._id);
      // activity.distance = action.payload.distance;
      // activity.time = action.payload.time;
      // activity.weight = action.payload.weight;
      // activity.sets = action.payload.sets;
      // activity.reps = action.payload.reps;

      state.loading = false;
      state.error = null;
    });
    builder.addCase(updateActivity.rejected, (state, action) => {
      console.log("rejected updateActivity");
      state.loading = false;
      state.error = action.error.message || null;
    });
  },
});

export const { updateActivityReducer } = activitySlice.actions;

export default activitySlice.reducer;