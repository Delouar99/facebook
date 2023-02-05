import React from "react";
import CreatePost from "../../components/CreatePost/CreatePost";
import FbCard from "../../components/Fb-cr/FbCard";
import ProfileHeader from "../../components/ProfileHeader/ProfileHeader";
import Userpost from "../../components/userpost/Userpost";
import Homeheader from "../HomeHeader/Homeheader";
import Friends from "./Friends/Friends";
import ProfileGallery from "./ProfileGallery/ProfileGallery";
import ProfileIntro from "./ProfileIntro/ProfileIntro";

const Profile = () => {
  return (
    <>
      <Homeheader />
      <ProfileHeader />
      <div className="fb-profile-body">
        <div className="fb-body-wraper">
          <div className="user-profile-personal-info">
            <ProfileIntro />
            <ProfileGallery />
            <Friends />
          </div>
          <div className="user-profile-post">
            <CreatePost />
            <Userpost />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
