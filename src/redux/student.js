import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  jobApplications: [],
  isLoading: false,
  error: null,
};

export const getJobApplications = createAsyncThunk(
  "student/getJobApplications",
  async () => {
    const { data } = await axios.get(
      "http://127.0.0.1:8000/api/jobapplications/"
    );
    return data;
  }
);

export const homeSlice = createSlice({
  name: "student",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getJobApplications.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getJobApplications.fulfilled, (state, action) => {
      state.isLoading = false;
      state.jobApplications = action.payload;
    });
    builder.addCase(getJobApplications.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export default homeSlice.reducer;
