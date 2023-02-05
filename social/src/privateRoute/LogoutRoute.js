import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const LogoutRoute = () => {
  const { loginState } = useSelector((state) => state.auth);
  return loginState ? <Navigate to="/" /> : <Outlet />;
};

//export default
export default LogoutRoute;
