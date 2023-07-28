import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const backendURL = "http://127.0.0.1:5000";

export const addActivityThunk = createAsyncThunk(
  "/api/addActivity",
  async ({ data, userId, userToken }, { rejectWithValue }) => {
    try {    
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${userToken}`,
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
  async ({ activityId, userToken }, { rejectWithValue }) => {
    try {  
      console.log(localStorage.getItem("userToken"));
      
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${userToken}`,
        }
      }
      await axios.delete(
        `${backendURL}/api/removeActivity`,
        { activityId },
        config
      )
    } catch (error) {
      if (error.response.data) {
        return rejectWithValue(error.response.data)
      }
    }
  }
);


