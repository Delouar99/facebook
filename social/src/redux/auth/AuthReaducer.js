import {
  LOGIN_FAILD,
  LOGIN_SUCCESS,
  REGISTER_FAILED,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  TOKEN_USER_FAILD,
  TOKEN_USER_SUCCESS,
} from "./actionTyfe.js";
import initaalState from "./initaalState.js";

/**
 * create auth reducer
 */

const AuthReaducer = (state = initaalState, { type, payload }) => {
  switch (type) {
    case REGISTER_REQUEST:
      return {
        ...state,
        lodding: true,
      };

    case REGISTER_SUCCESS:
      return {
        ...state,
        lodding: false,
        message: payload,
      };

    case REGISTER_FAILED:
      return {
        ...state,
        lodding: false,
        message: payload,
      };

    case LOGIN_FAILD:
      return {
        ...state,
        lodding: false,
        user: {},
        loginState: false,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        lodding: false,
        user: payload,
        loginState: true,
      };

    case TOKEN_USER_SUCCESS:
      return {
        ...state,
        lodding: false,
        user: payload,
        loginState: true,
      };

    case TOKEN_USER_FAILD:
      return {
        ...state,
        lodding: false,
        user: {},
        loginState: false,
      };

    default:
      return state;
  }
};

//export deafult
export default AuthReaducer;
