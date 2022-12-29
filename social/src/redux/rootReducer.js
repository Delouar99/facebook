import { combineReducers } from "redux";
import AuthReaducer from "../redux/auth/AuthReaducer.js";
import toastReducer from "./auth/Toast/toastReducer.js";
import LoaderReaducer from "./auth/top-loader/loaderReducer.js";

//create root reducer
const rootReducer = combineReducers({
  auth: AuthReaducer,
  toast: toastReducer,
  loader: LoaderReaducer,
});

export default rootReducer;
