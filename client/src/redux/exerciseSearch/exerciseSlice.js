import { createSlice } from "@reduxjs/toolkit";
import { fetchExercises } from "./exerciseActions";

export const exerciseSlice = createSlice({
  name: "exerciseAPI",
  initialState: {},
  reducers: {},
  extraReducers: async (builder) => {
    builder.addCase(fetchExercises.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchExercises.fulfilled, (state, action) => {
      state.exercises = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(fetchExercises.rejected, (state, action) => {
      console.log("rejected fetchExercises");
      state.loading = false;
      state.error = action.error.message || null;
    });
  },
});

export default exerciseSlice.reducer;