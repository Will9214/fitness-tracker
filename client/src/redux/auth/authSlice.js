import { createSlice } from "@reduxjs/toolkit";
import { signUp, signIn, getUser } from "./authActions";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    user: null,
    userToken: localStorage.getItem("userToken") || "",
    error: null,
    success: false,
  },
  reducers: {
    signOut: (state) => {
      localStorage.removeItem("userToken");
      state.loading = false;
      state.user = null;
      state.userToken = null;
      state.error = null;
      state.success = false;
    },
    setCredentials: (state, { payload }) => {  
      state.user = payload.user;
    },
  },
  extraReducers: {
    [signUp.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [signUp.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
    },
    [signUp.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [signIn.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [signIn.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.user = payload.username;
      state.userToken = payload.userToken;
    },
    [signIn.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [getUser.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.user = payload.user;
      state.userToken = payload.userToken;
    },
    [getUser.rejected]: (state, {payload }) => {
      state.loading = false;
      state.error = payload;
    }
  },
});

export const { signOut, setCredentials } = authSlice.actions;

export default authSlice.reducer;