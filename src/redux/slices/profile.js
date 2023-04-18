import { getUserProfile } from "@/utils/https/users";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  isLoading: false,
  isRejected: false,
  isFulfilled: false,
  err: null,
};

const getProfileThunk = createAsyncThunk(
  "profile/get",
  async ({ id, token, controller }) => {
    try {
      const response = await getUserProfile(id, token, controller);
      return response.data;
    } catch (err) {
      return err;
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    filter: (prevState) => {
      return {
        ...prevState,
        data: [],
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfileThunk.pending, (prevState) => {
        return {
          ...prevState,
          isLoading: true,
          isRejected: false,
          isFulfilled: false,
          err: null,
        };
      })
      .addCase(getProfileThunk.fulfilled, (prevState, action) => {
        // console.log(action)
        return {
          ...prevState,
          isLoading: false,
          isFulfilled: true,
          data: action.payload,
        };
      })
      .addCase(getProfileThunk.rejected, (prevState, action) => {
        return {
          ...prevState,
          isLoading: false,
          isRejected: true,
          err: action.payload,
        };
      });
  },
});

export const profileAction = {
  ...profileSlice.actions,
  getProfileThunk,
};
export default profileSlice.reducer;
