import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { login } from "../../utils/https/auth";

// const controller = new AbortController();
// const signal = controller.signal;

const initialState = {
  data: [],
  isLoading: false,
  isRejected: false,
  isFulfilled: false,
  err: null,
};

const getAuthThunk = createAsyncThunk(
  "auth/post",
  async ({ email, password }, controller) => {
    // const contr  oller = new AbortController();
    try {
      // console.log(response.data)
      // console.log(email);
      // console.log(password);
      const response = await login(email, password, controller);
      return response.data;
    } catch (err) {
      return err;
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    filter: () => {
      return initialState;
    },
    // updateProfile: (prevState) => {
    //   return {
    //     ...prevState,
    //   }
    // }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAuthThunk.pending, (prevState) => {
        return {
          ...prevState,
          isLoading: true,
          isRejected: false,
          isFulfilled: false,
          err: null,
        };
      })
      .addCase(getAuthThunk.fulfilled, (prevState, action) => {
        // console.log(action)
        return {
          ...prevState,
          isLoading: false,
          isFulfilled: true,
          data: action.payload,
        };
      })
      .addCase(getAuthThunk.rejected, (prevState, action) => {
        return {
          ...prevState,
          isLoading: false,
          isRejected: true,
          err: action.payload,
        };
      });
  },
});

export const authAction = {
  ...authSlice.actions,
  getAuthThunk,
};
export default authSlice.reducer;
