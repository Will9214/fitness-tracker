import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const backendURL = process.env.REACT_APP_BACKEND_URL;

export const addWorkoutThunk = createAsyncThunk(
  "/api/addWorkout",
  async ({ data, userId }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("userToken")}`,
        }
      }
      await axios.post(
        `${backendURL}/api/addWorkout`,
        { data, userId },
        config
      )
    } catch (error) {
      if (error.response.data) {
        return rejectWithValue(error.response.data)
      }
    }
  }
);

export const getUserWorkouts = createAsyncThunk(
  "/api/getUserWorkouts",
  async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("userToken")}`
        },
      };
      const { data } = await axios.get(
        `${backendURL}/api/getUserWorkouts`,
        config
      );
      return data;
    } catch (error) {
      return error;
    }
  }
);

export const removeWorkoutThunk = createAsyncThunk(
  "/api/removeWorkout",
  async ({ workoutId }, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(
        `${backendURL}/api/removeWorkout`,
        { data: { workoutId: workoutId },
          headers: {"Authorization": `Bearer ${localStorage.getItem("userToken")}`}},
      );
      return data;
    } catch (error) {
      if (error.response.data) {
        return rejectWithValue(error.response.data)
      }
    }
  }
);

export const addActivityToWorkout = createAsyncThunk(
  "/api/addActivityToWorkout",
  async({ workoutId, activityId, userId }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("userToken")}`
        },
      }
      const { data } = await axios.post(
        `${backendURL}/api/addActivityToWorkout`,
        { workoutId, activityId, userId },
        config
      );
      return data;
    } catch (error) {
      if (error.response.data) {
        return rejectWithValue(error.response.data);
      }
    }
  }
);

export const deleteActivityFromWorkout = createAsyncThunk(
  "/api/deleteActivityFromWorkout",
  async({ workoutId, activityId }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("userToken")}`
        },
      }
      const { data } = await axios.post(
        `${backendURL}/api/deleteActivityFromWorkout`,
        { workoutId, activityId },
        config
      );
      return data;
    } catch (error) {
      if (error.response.data) {
        return rejectWithValue(error.response.data);
      }
    }
  }
);

export const addCompletedWorkout = createAsyncThunk(
  "/api/addCompletedWorkout",
  async ({ workout }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("userToken")}`,
        }
      }
      const { data } = await axios.post(
        `${backendURL}/api/addCompletedWorkout`,
        { workout },
        config
      );
      return data;
    } catch (error) {
      if (error.response.data) {
        return rejectWithValue(error.response.data)
      }
    }
  }
);
