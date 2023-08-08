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
  },
  extraReducers: async (builder) => {
    builder.addCase(signUp.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(signUp.fulfilled,  (state) => {
      state.loading = false;
      state.success = true;
    });
    builder.addCase(signUp.rejected, (state, action) => {
      console.log("rejected signUp");
      state.loading = false;
      state.error = action.error.message || null;
    });
    builder.addCase(signIn.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.username;
      state.userToken = action.payload.userToken;
    });
    builder.addCase(signIn.rejected, (state, action) => {
      console.log("rejected signIn");
      state.loading = false;
      state.error = action.error.message || null;
    });
    builder.addCase(getUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.userToken = action.payload.userToken;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      console.log("rejected getUser");
      state.loading = false;
      state.error = action.error.message || null;
    });
  },
});

export const { signOut } = authSlice.actions;

export default authSlice.reducer;