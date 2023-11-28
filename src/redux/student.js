import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  jobApplications: [],
  count: {},
  isLoading: false,
  error: null,
};

export const getJobApplications = createAsyncThunk(
  "student/getJobApplications",
  async () => {
    const user = localStorage.getItem("username");
    const { data } = await axios.get(
      `http://127.0.0.1:8000/api/jobapplications/${user}`
    );
    return data;
  }
);

export const postJobApplications = createAsyncThunk(
  "student/postJobApplications",
  async (data) => {
    const { response } = await axios.post(
      "http://127.0.0.1:8000/api/jobapplications/",
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  }
);

export const getWaitlistCount = createAsyncThunk(
  "student/getWaitlistCount",
  async (id, username) => {
    const user = localStorage.getItem("username");
    const convertedFloat = parseFloat(user);

    window.console.log(id, user, username, convertedFloat);
    const { data } = await axios.get(
      `http://127.0.0.1:8000/api/waitlist/${id}/${user}/`
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
    builder.addCase(postJobApplications.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(postJobApplications.fulfilled, (state, action) => {
      state.isLoading = false;
      state.jobApplications = action.payload;
    });
    builder.addCase(postJobApplications.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(getWaitlistCount.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getWaitlistCount.fulfilled, (state, action) => {
      state.isLoading = false;
      state.count = action.payload;
    });
    builder.addCase(getWaitlistCount.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export default homeSlice.reducer;
