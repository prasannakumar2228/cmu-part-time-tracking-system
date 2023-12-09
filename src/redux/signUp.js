import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  signUp: {},
  studentDetails: {},
  isLoading: false,
  error: null,
  loginstudentDetails: {},
};

export const postSignup = createAsyncThunk("home/postSignup", async () => {
  const { data } = await axios.post("http://127.0.0.1:8000/api/profiles");
  return data;
});

export const getStudentDetails = createAsyncThunk(
  "home/getStudentDetails",
  async (id) => {
    const { data } = await axios.get(`http://127.0.0.1:8000/api/getid/${id}`);
    return data;
  }
);

export const getLoginUserDetails = createAsyncThunk(
  "home/getLoginUserDetails",
  async (id) => {
    const { data } = await axios.get(
      `http://127.0.0.1:8000/api/profiles/${id}`
    );
    return data;
  }
);

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(postSignup.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(postSignup.fulfilled, (state, action) => {
      state.isLoading = false;
      state.signUp = action.payload;
    });
    builder.addCase(postSignup.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(getStudentDetails.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getStudentDetails.fulfilled, (state, action) => {
      state.isLoading = false;
      state.studentDetails = action.payload;
    });
    builder.addCase(getStudentDetails.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(getLoginUserDetails.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getLoginUserDetails.fulfilled, (state, action) => {
      state.isLoading = false;
      state.loginstudentDetails = action.payload;
    });
    builder.addCase(getLoginUserDetails.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export default homeSlice.reducer;
