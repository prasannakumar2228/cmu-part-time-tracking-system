import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  signUp: {},
  isLoading: false,
  error: null,
};

export const postSignup = createAsyncThunk("home/postSignup", async () => {
  const { data } = await axios.post("http://127.0.0.1:8000/api/profiles");
  return data;
});

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
      state.photos = action.payload;
    });
    builder.addCase(postSignup.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export default homeSlice.reducer;
