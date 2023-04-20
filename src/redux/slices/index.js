import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./auth";
import profileSLice from "./profile";
import transactionsSlice from "./transactions";
const reducers = combineReducers({
  auth: authSlice,
  profile: profileSLice,
  transactions: transactionsSlice,
});

export default reducers;
