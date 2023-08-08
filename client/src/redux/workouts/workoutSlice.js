import { createSlice } from "@reduxjs/toolkit";
import { addActivityToWorkout, deleteActivityFromWorkout, getUserWorkouts, removeWorkoutThunk } from "./workoutActions";

export const workoutSlice = createSlice({
  name: "workout",
  initialState: {
    workouts: [],
  },
  reducers: {},
  extraReducers: async (builder) => {
    builder.addCase(getUserWorkouts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserWorkouts.fulfilled, (state, action) => {
      state.workouts = action.payload.workouts;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(getUserWorkouts.rejected, (state, action) => {
      console.log("rejected getUserWorkouts");
      state.loading = false;
      state.error = action.error.message || null;
    });
    builder.addCase(addActivityToWorkout.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addActivityToWorkout.fulfilled, (state, action) => {
      const workout = state.workouts.find(workout => workout?._id === action.payload.workout._id);
      workout.activities.push(action.payload.activity);
      state.loading = false;
      state.error = null;
    });
    builder.addCase(addActivityToWorkout.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || null;
    })
    builder.addCase(deleteActivityFromWorkout.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteActivityFromWorkout.fulfilled, (state, action) => {
      const workout = state.workouts.find(workout => workout?._id === action.payload.workout._id);
      const deletedActivityIndex = workout.activities.indexOf(action.payload.activity._id);
      workout.activities.splice(deletedActivityIndex, 1);
      state.loading = false;
      state.error = null;
      
    });
    builder.addCase(deleteActivityFromWorkout.rejected, (state, action) => {
      console.log("rejected deleteActivityFromWorkout");
      state.loading = false;
      state.error = action.error.message || null;
    })
  },
});

export default workoutSlice.reducer;