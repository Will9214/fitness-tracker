import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import AuthReducer from "./auth/authSlice";
import { authApi } from "./auth/authService";
import ActivityReducer from "./activities/activitySlice";


const store =  configureStore({
  reducer: {
    auth: AuthReducer,
    [authApi.reducerPath]: authApi.reducer,
    userActivities: ActivityReducer,
    // userWorkouts: WorkoutReducer,
    // userObjectives: ObjectiveReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware),
});

export default store;