import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const backendURL = "http://127.0.0.1:5000";

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
      await axios.post(
        `${backendURL}/api/addActivity`,
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
      console.log(data, "activities");
      
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
      const config = {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("userToken")}`,
        }
      }
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


