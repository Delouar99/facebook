import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AuthReject = ({ children }) => {
  const { loginState } = useSelector((state) => state.auth);
  // console.log(loginState);
  return loginState ? <Navigate to="/login" /> : children;
};

export default AuthReject;
