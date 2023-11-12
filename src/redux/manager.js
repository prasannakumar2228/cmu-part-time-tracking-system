import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  jobPosts: [],
  isLoading: false,
  error: null,
};

export const getJobs = createAsyncThunk("manager/getJobs", async () => {
  const { data } = await axios.get("http://127.0.0.1:8000/api/jobposts/");
  return data;
});

export const homeSlice = createSlice({
  name: "manager",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getJobs.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getJobs.fulfilled, (state, action) => {
      state.isLoading = false;
      state.jobPosts = action.payload;
    });
    builder.addCase(getJobs.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export default homeSlice.reducer;
