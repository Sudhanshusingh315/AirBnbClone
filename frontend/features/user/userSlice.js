import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authUser, registerUser } from "./userAPI";
export const userAuth = createAsyncThunk(
  // user auth  is login
  "users/useAuth",
  async (userCredentials, { rejectWithValue }) => {
    try {
      const response = await authUser(userCredentials);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const userRegister = createAsyncThunk(
  // user auth  is login
  "users/useRegister",
  async (userCredentials, { rejectWithValue }) => {
    try {
      const response = await registerUser(userCredentials);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
  isLoading: null,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOut: (state) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userAuth.fulfilled, (state, action) => {
        console.log("accepted value", action.payload);
        if (action.payload) {
          localStorage.setItem("userInfo", JSON.stringify(action.payload));
        }
        state.userInfo = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(userAuth.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(userAuth.rejected, (state, action) => {
        console.log("rejected Error ", action.payload);
        state.userInfo = null;
        state.isLoading = false;
        state.error = action.payload.Error;
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        if (action.payload) {
          localStorage.setItem("userInfo", JSON.stringify(action.payload));
        }
        state.userInfo = action.payload;
        state.isLoading = false;
        state.error = false;
      })
      .addCase(userRegister.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.error = action.payload.Error;
        state.isLoading = false;
        state.userInfo = null;
      });
  },
});

// Action creators are generated for each case reducer function
export const { logOut } = userSlice.actions;

export default userSlice.reducer;
