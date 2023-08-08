import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./auth/authSlice";
import ActivityReducer from "./activities/activitySlice";
import ExerciseApiReducer from "./exerciseSearch/exerciseSlice";
import WorkoutReducer from "./workouts/workoutSlice";


const store =  configureStore({
  reducer: {
    auth: AuthReducer,
    userActivities: ActivityReducer,
    exerciseApi: ExerciseApiReducer,
    userWorkouts: WorkoutReducer,
    // userObjectives: ObjectiveReducer,
  },
});

export default store;