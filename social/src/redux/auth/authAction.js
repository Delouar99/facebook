import axios from "axios";
import Cookies from "js-cookie";

import createToast from "../../Utility/Toast";
import {
  LOGIN_FAILD,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_FAILED,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  TOKEN_USER_FAILD,
  TOKEN_USER_REQ,
  TOKEN_USER_SUCCESS,
  USER_LOGOUT,
  USER_PROFILE_UPDATE,
} from "./actionTyfe";
import { LOADER_START } from "./top-loader/loadertypes";

//user register
export const userRegister =
  (data, setInput, e, setRegister, navigate) => async (dispatch) => {
    try {
      dispatch({
        type: REGISTER_REQUEST,
      });

      await axios
        .post("/api/v1/user/register", data)
        .then((res) => {
          createToast("user Register successfully", "success");

          dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data.message,
          });

          setInput({
            fname: "",
            sname: "",
            emailornumber: "",
            pass: "",
            day: "",
            month: "",
            year: "",
            gender: "",
          });
          e.target.reset();
          setRegister(false);
          navigate("/activation/account");
        })
        .catch((error) => {
          createToast(error.response.data.message, "error");
          dispatch({
            type: REGISTER_FAILED,
            payload: error.rsponse.data,
          });
        });
    } catch (error) {
      createToast(error.response.data.message, "error");
      dispatch({
        type: REGISTER_FAILED,
        payload: error.response.data,
      });
    }
  };

//user accout  activation by otp
export const activationByOTP =
  ({ code, email }, navigate) =>
  async (daspatch) => {
    try {
      await axios
        .post("/api/v1/user/code-activation", {
          code: code,
          email: email,
        })
        .then((res) => {
          createToast("Accoutn activate successfully", "success");
          navigate("/");
        })
        .catch((error) => {
          createToast(error.response.data.message);
        });
    } catch (error) {
      createToast(error.response.data.message);
    }
  };

//user resend link
export const resendLink = (email, navigate) => async (daspatch) => {
  try {
    await axios
      .post("/api/v1/user/resend-Link", {
        auth: email,
      })
      .then((res) => {
        createToast(res.data.message, "success");
        navigate("/activation/account");
      })
      .catch((error) => {
        createToast(error.response.data.message);
      });
  } catch (error) {
    createToast(error.response.data.message);
  }
};

//user check password reset code

export const checkPasswordresetCode = (data, navigate) => async (daspatch) => {
  try {
    await axios
      .post("/api/v1/user/check-password-otp", {
        auth: data.auth,
        code: data.code,
      })
      .then((res) => {
        createToast(res.data.message, "success");
        navigate("/change-password");
      })
      .catch((error) => {
        createToast(error.response.data.message);
      });
  } catch (error) {
    createToast(error.response.data.message);
  }
};

//change password

export const changePassword = (data, navigate) => async (daspatch) => {
  try {
    await axios
      .post("/api/v1/user/Password-reset", {
        id: data.id,
        code: data.code,
        password: data.password,
      })
      .then((res) => {
        createToast(res.data.message, "success");
        navigate("/login");
      })
      .catch((error) => {
        createToast(error.response.data.message);
      });
  } catch (error) {
    createToast(error.response.data.message);
  }
};

//user login
export const userLogin = (data, navigate) => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_REQUEST,
    });

    await axios
      .post("/api/v1/user/login", {
        auth: data.auth,
        password: data.password,
      })
      .then((res) => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data.user,
        });

        dispatch({
          type: LOADER_START,
        });
        createToast("Login Successfull", "success");
        navigate("/");
      })
      .catch((error) => {
        dispatch({
          type: LOGIN_FAILD,
        });
        createToast(error.response.data.message);
      });
  } catch (error) {
    console.log(error);
  }
};

//TOKEN user login
export const tokenUser = (token, navigate) => async (dispatch) => {
  try {
    dispatch({
      type: TOKEN_USER_REQ,
    });

    await axios
      .get("/api/v1/user/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch({
          type: TOKEN_USER_SUCCESS,
          payload: res.data.user,
        });

        dispatch({
          type: LOADER_START,
        });

        // navigate("/");
      })
      .catch((error) => {
        dispatch({
          type: TOKEN_USER_FAILD,
        });
        dispatch(userLogout());
        createToast(error.response.data.message);
      });
  } catch (error) {
    console.log(error);
    dispatch(userLogout());
    dispatch({
      type: TOKEN_USER_FAILD,
    });
  }
};

//LOGOUT
export const userLogout = (navigate) => (dispatch) => {
  dispatch({
    type: LOADER_START,
  });
  Cookies.remove("authToken");
  dispatch({
    type: USER_LOGOUT,
  });
};

//update profile

export const profileUpdate = (data, id, setBioShow) => async (dispatch) => {
  try {
    await axios
      .put(`/api/v1/user/profile-update/${id}`, data)
      .then((res) => {
        setBioShow(false);
        dispatch({ type: USER_PROFILE_UPDATE, payload: data });
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
};
