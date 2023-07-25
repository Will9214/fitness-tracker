import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import AuthReducer from "./auth/authSlice";
import { authApi } from "./auth/authService";

const store =  configureStore({
  reducer: {
    auth: AuthReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware),
});

export default store;