import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  jobPosts: [],
  isLoading: false,
  error: null,
  profile: {
    Title: "",
    Description: "",
    DateOfPosting: "",
    Deadline: "",
    NumberOfOpenings: "",
    Requirement: "",
    HourlyWage: "",
    WorkHours: "",
    Skills: "",
    Experience: "",
  },
  updateData: [],
};

export const getJobs = createAsyncThunk("manager/getJobs", async () => {
  const { data } = await axios.get("http://127.0.0.1:8000/api/jobposts/");
  return data;
});

export const postJobs = createAsyncThunk("manager/postJobs", async (data) => {
  const { response } = await axios.post(
    "http://127.0.0.1:8000/api/jobposts/",
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response;
});

export const updateJobs = createAsyncThunk(
  "manager/updateJobs",
  async (data) => {
    try {
      const id = data?.id; // Ensure 'id' is extracted before making the request
      if (!id) {
        throw new Error("Invalid data: 'id' is missing.");
      }

      // Log the extracted 'id' for debugging
      console.log("ID:", id);

      const { response } = await axios.put(
        `http://127.0.0.1:8000/api/jobposts/${id}/`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return response;
    } catch (error) {
      console.error("Error updating job:", error);
      throw error; // Rethrow the error to be caught by the component
    }
  }
);

export const fetchDatabyID = createAsyncThunk(
  "manager/fetchDatabyID",
  async (id) => {
    const { data } = await axios.get(
      `http://127.0.0.1:8000/api/jobposts/${id}/`
    );
    return data;
  }
);

export const deleteJob = createAsyncThunk("manager/deleteJob", async (id) => {
  const { data } = await axios.delete(
    `http://127.0.0.1:8000/api/jobposts/${id}/`
  );
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
    builder.addCase(postJobs.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(postJobs.fulfilled, (state, action) => {
      state.isLoading = false;
      state.profile = action.payload;
    });
    builder.addCase(postJobs.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(updateJobs.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateJobs.fulfilled, (state, action) => {
      state.isLoading = false;
      state.profile = action.payload;
    });
    builder.addCase(updateJobs.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(fetchDatabyID.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchDatabyID.fulfilled, (state, action) => {
      state.isLoading = false;
      state.updateData = action.payload;
    });
    builder.addCase(fetchDatabyID.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(deleteJob.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteJob.fulfilled, (state, action) => {
      state.isLoading = false;
      state.jobPosts = state.jobPosts.filter(
        (job) => job.id !== action.payload.id
      );
    });
    builder.addCase(deleteJob.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export default homeSlice.reducer;
