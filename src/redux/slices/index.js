import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./auth";
import profileSLice from "./profile";
const reducers = combineReducers({
  auth: authSlice,
  profile: profileSLice,
});

export default reducers;
