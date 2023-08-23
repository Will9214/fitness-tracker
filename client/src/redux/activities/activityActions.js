import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const backendURL = process.env.REACT_APP_BACKEND_URL;

export const addActivityThunk = createAsyncThunk(
  "/api/addActivity",
  async ({ data, userId }, { rejectWithValue }) => {
    try {    
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("userToken")}`,
        }
      }
      const activity = await axios.post(
        `${backendURL}/api/addActivity`,
        { data, userId },
        config
      );
      
      return activity.data;
    } catch (error) {
      if (error.response.data) {
        return rejectWithValue(error.response.data)
      }
    }
  }
);

export const getUserActivities = createAsyncThunk(
  "/api/getUserActivities",
  async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("userToken")}`
        },
      };
      const { data } = await axios.get(
        `${backendURL}/api/getUserActivities`,
        config
      );
      
      return data;
    } catch (error) {
      return error;
    }
  }
)

export const removeActivityThunk = createAsyncThunk(
  "/api/removeActivity",
  async ({ activityId }, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(
        `${backendURL}/api/removeActivity`,
        { data: { activityId: activityId },
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

export const updateActivity = createAsyncThunk(
  "/api/updateActivity",
  async ({ activityId, editedActivityDistance, editedActivityTime, editedActivityWeight, editedActivitySets, editedActivityReps, editedActivityDescription, editedActivityName }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("userToken")}`
        }
      };
      await axios.post(
        `${backendURL}/api/updateActivity`,
        { activityId, editedActivityDistance, editedActivityTime, editedActivityWeight, editedActivitySets, editedActivityReps, editedActivityDescription, editedActivityName },
        config,
      );
    } catch (error) {
      if (error.response.message) {
        return rejectWithValue(error.response.message)
      }
    }
  }
);