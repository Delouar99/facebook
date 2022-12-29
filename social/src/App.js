import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import Auth from "./pages/Auth/Auth";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Activation from "./components/Activation/Activation";
import Forgot from "./pages/forgot/Forgot";
import Findaccound from "./pages/findAccound/Findaccound";
import Password from "./pages/Password/Password";
import LoadingBar from "react-top-loading-bar";
import { useDispatch, useSelector } from "react-redux";
import { LOADER_END } from "./redux/auth/top-loader/loadertypes";
import AuthReject from "./privateRoute/AuthReject";
import { useEffect } from "react";
import { tokenUser } from "./redux/auth/authAction";
import AuthRedirect from "./privateRoute/AuthRedirect";
import Cookies from "js-cookie";

function App() {
  const authToken = Cookies.get("authToken");
  const loader = useSelector((state) => state.loader);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // console.log(token);
  // useEffect(() => {
  //   if (token) {
  //     tokenDispatch(tokenUser(token));
  //   }
  // }, [tokenDispatch]);
  useEffect(() => {
    if (authToken) {
      dispatch(tokenUser(authToken, navigate));
    }
  }, [dispatch, authToken]);

  return (
    <>
      <LoadingBar
        color="#1876f2"
        progress={loader}
        onLoaderFinished={() => dispatch({ type: LOADER_END })}
      />
      <ToastContainer
        style={{ zIndex: 999999 }}
        position="top-center"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
      />
      <Routes>
        <Route path="/activation/:type" element={<Activation />} />
        <Route
          path="/"
          element={
            <AuthRedirect>
              <Home />
            </AuthRedirect>
          }
        />
        <Route
          path="/login"
          element={
            <AuthReject>
              <Auth />
            </AuthReject>
          }
        />
        <Route path="/profile" element={<Profile />} />
        <Route path="/forgot-password" element={<Forgot />} />
        <Route path="/findaccound" element={<Findaccound />} />
        <Route path="/change-password" element={<Password />} />
      </Routes>
    </>
  );
}

export default App;
