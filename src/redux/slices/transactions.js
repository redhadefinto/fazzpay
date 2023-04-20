import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { login } from "../../utils/https/auth";

const initialState = {
  data: [],
  isLoading: false,
  isRejected: false,
  isFulfilled: false,
  err: null,
};

const getTransactionsThunk = createAsyncThunk(
  "transaction/post",
  async ({ receiverId, amount, notes, image, firstName, lastName, phone }) => {
    try {
      return { receiverId, amount, notes, image, firstName, lastName, phone };
    } catch (err) {
      return err;
    }
  }
);

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    filter: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTransactionsThunk.pending, (prevState) => {
        return {
          ...prevState,
          isLoading: true,
          isRejected: false,
          isFulfilled: false,
          err: null,
        };
      })
      .addCase(getTransactionsThunk.fulfilled, (prevState, action) => {
        return {
          ...prevState,
          isLoading: false,
          isFulfilled: true,
          data: action.payload,
        };
      })
      .addCase(getTransactionsThunk.rejected, (prevState, action) => {
        return {
          ...prevState,
          isLoading: false,
          isRejected: true,
          err: action.payload,
        };
      });
  },
});

export const transactionActions = {
  ...transactionSlice.actions,
  getTransactionsThunk,
};
export default transactionSlice.reducer;
