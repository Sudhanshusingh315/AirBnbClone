import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { newPost } from "./postAPI";

export const newPostThunk = createAsyncThunk(
  "post/newPostThunk",
  async ({ places,token }, { rejectWithValue }) => {
    try {
      const response = await newPost({ places, token });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const initialState = {
  value: 0,
  isLoading:null,
  error:null
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(newPostThunk.fulfilled, (state, action) => {
        state.isLoading=false;
        state.error = null
      console.log("data recieved", action.payload);
    }).addCase(newPostThunk.pending,(state)=>{
        state.isLoading=true;
        state.error = null;
    }).addCase(newPostThunk.rejected,(state,action)=>{
        state.isLoading = false;
        state.error = action.payload.Error;
    })
  },
});

// Action creators are generated for each case reducer function

export default postSlice.reducer;
