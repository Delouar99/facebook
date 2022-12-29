import React from "react";
import user from "../../assets/images/user.png";
import Avatar from "../../components/Avatar/Avatar";
import Sidebar from "../../components/Sicebar/Sidebar";
import Timeline from "../../components/Timeline/Timeline";
import Homeheader from "../HomeHeader/Homeheader";

const Home = () => {
  return (
    <>
      <Homeheader />
      <div className="fb-home-body">
        <Sidebar />

        <Timeline />
      </div>
    </>
  );
};

export default Home;
