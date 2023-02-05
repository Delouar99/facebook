import React from "react";
import { useSelector } from "react-redux";
import Sidebar from "../../components/Sicebar/Sidebar";
import Timeline from "../../components/Timeline/Timeline";
import Auth from "../Auth/Auth";
import Homeheader from "../HomeHeader/Homeheader";

const Home = () => {
  const { loginState } = useSelector((state) => state.auth);

  return (
    <>
      {loginState ? (
        <>
          <Homeheader />

          <div className="fb-home-body">
            <Sidebar />

            <Timeline />
          </div>
        </>
      ) : (
        <Auth />
      )}
    </>
  );
};

export default Home;
