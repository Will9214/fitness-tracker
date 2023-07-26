import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const backendURL = "http://127.0.0.1:5000";

export const addActivity = createAsyncThunk(
  "/api/addActivity",
  async ({ data, userId, userToken }, { rejectWithValue}) => {
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
    debugger;
  }
);


