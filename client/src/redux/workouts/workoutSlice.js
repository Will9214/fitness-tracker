import { createSlice } from "@reduxjs/toolkit";
import { addActivityToWorkout, addCompletedWorkout, addWorkoutThunk, deleteActivityFromWorkout, getUserCompletedWorkouts, getUserWorkouts, removeWorkoutThunk } from "./workoutActions";

export const workoutSlice = createSlice({
  name: "workout",
  initialState: {
    workouts: [],
    completedWorkouts: [],
  },
  reducers: {
    updateActivityWeightInWorkout: (state, action) => {
      const workout = state.workouts.find((workout) => workout._id === action.payload.workoutId);
      const activity = workout.activities.find((activity) => activity._id === action.payload.activityId);

      activity.weight = action.payload.editedActivityWeight;
    },
    updateActivitySetsInWorkout: (state, action) => {
      const workout = state.workouts.find((workout) => workout._id === action.payload.workoutId);
      const activity = workout.activities.find((activity) => activity._id === action.payload.activityId);

     activity.sets = action.payload.editedActivitySets;
    },
    updateActivityRepsInWorkout: (state, action) => {
      const workout = state.workouts.find((workout) => workout._id === action.payload.workoutId);
      const activity = workout.activities.find((activity) => activity._id === action.payload.activityId);

     activity.reps = action.payload.editedActivityReps;
    },
    updateActivityDistanceInWorkout: (state, action) => {
      const workout = state.workouts.find((workout) => workout._id === action.payload.workoutId);
      const activity = workout.activities.find((activity) => activity._id === action.payload.activityId);

     activity.distance = action.payload.editedActivityDistance;
    },
    updatedActivityTimeInWorkout: (state, action) => {
      const workout = state.workouts.find((workout) => workout._id === action.payload.workoutId);
      const activity = workout.activities.find((activity) => activity._id === action.payload.activityId);

     activity.time = action.payload.editedActivityTime;
    },
  },
  extraReducers: async (builder) => {
    builder.addCase(addWorkoutThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addWorkoutThunk.fulfilled, (state, action) => {
      state.workouts.push(action.payload.workout);
      state.loading = false;
      state.error = null;
    });
    builder.addCase(addWorkoutThunk.rejected, (state, action) => {
      console.log("rejected addWorkoutThunk");
      state.loading = false;
      state.error = action.error.message || null;
    });
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
      const activityId = action.payload.activity._id;
      const workout = state.workouts.find(workout => workout?._id === action.payload.workout._id);
      const deletedActivityIndex = workout.activities.map(activity => activity._id).indexOf(activityId);
      workout.activities.splice(deletedActivityIndex, 1);
      state.loading = false;
      state.error = null;
      
    });
    builder.addCase(deleteActivityFromWorkout.rejected, (state, action) => {
      console.log("rejected deleteActivityFromWorkout");
      state.loading = false;
      state.error = action.error.message || null;
    });
    builder.addCase(removeWorkoutThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(removeWorkoutThunk.fulfilled, (state, action) => {
      const workoutId = action.payload._id;
      state.workouts = state.workouts.filter(workout => workout._id !== workoutId);
      state.loading = false;
      state.error = null;
    });
    builder.addCase(removeWorkoutThunk.rejected, (state, action) => {
      console.log("rejected removeWorkoutThunk"); 
      state.loading = false;
      state.error = action.error.message || null;
    });
    builder.addCase(addCompletedWorkout.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addCompletedWorkout.fulfilled, (state, action) => {
      state.completedWorkouts.push(action.payload.completedWorkout);
      state.loading = false;
      state.error = null;
    });
    builder.addCase(addCompletedWorkout.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || null;
    });
    builder.addCase(getUserCompletedWorkouts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserCompletedWorkouts.fulfilled, (state, action) => {
      state.completedWorkouts = action.payload.completedWorkouts;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(getUserCompletedWorkouts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || null;
    });
  },
});

export const { updateActivityWeightInWorkout, updateActivitySetsInWorkout, updateActivityRepsInWorkout, updateActivityDistanceInWorkout, updatedActivityTimeInWorkout } = workoutSlice.actions;

export default workoutSlice.reducer;