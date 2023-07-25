import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const backendURL = "http://127.0.0.1:5000";

export const signUp = createAsyncThunk(
  "/auth/signup",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      }
      await axios.post(
        `${backendURL}/auth/signup`,
        { username, password },
        config
      )
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
);

export const signIn = createAsyncThunk(
  "/auth/signin",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      }
      const { data } = await axios.post(
        `${backendURL}/auth/signin`,
        { username, password },
        config
      )
      localStorage.setItem("userToken", data.userToken)    
      return data
    } catch (error) {
      // return error message from API
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
);