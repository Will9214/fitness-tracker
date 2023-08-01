import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import AuthReducer from "./auth/authSlice";
import { authApi } from "./auth/authService";
import ActivityReducer from "./activities/activitySlice";
import ExerciseApiReducer from "./exerciseSearch/exerciseSlice";


const store =  configureStore({
  reducer: {
    auth: AuthReducer,
    [authApi.reducerPath]: authApi.reducer,
    userActivities: ActivityReducer,
    exerciseApi: ExerciseApiReducer,
    // userWorkouts: WorkoutReducer,
    // userObjectives: ObjectiveReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware),
});

export default store;