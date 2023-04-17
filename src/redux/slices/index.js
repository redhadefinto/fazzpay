import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./auth";
const reducers = combineReducers({
  auth: authSlice,
});

export default reducers;
