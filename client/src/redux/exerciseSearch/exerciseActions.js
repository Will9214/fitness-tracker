import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const apiKey = process.env.REACT_APP_EXERCISE_API_KEY;

export const fetchExercises = createAsyncThunk(
  "/v1/exercises",
  async ({ name, type, muscle }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": apiKey,
        }
      };

      const setName = () => {
        if (name) {
          return `name=${name}`;
        } else {
          return `name=`;
        }
      };

      const setType = () => {
        if (type) {
          return `&type=${type}`;
        } else {
          return `&type=`
        }
      };

      const setMuscle = () => {
        if (muscle) {
          return `&muscle=${muscle}`;
        } else {
          return `&muscle=`;
        }
      };

      const { data} = await axios.get(
        `https://api.api-ninjas.com/v1/exercises?${setName()}${setType()}${setMuscle()}`,
        config,
      );
      return data;
    } catch (error) {
      if (error.response.data) {
        return rejectWithValue(error.response.data)
      }
    }
  }
);