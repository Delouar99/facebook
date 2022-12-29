import React from "react";
import { useSelector } from "react-redux";
const Avatar = () => {
  const { user } = useSelector((state) => state.auth);
  // const photo =    "https://www.shutterstock.com/image-vector/male-avatar-profile-picture-vector-260nw-221431012.jpg";
  const photo = user.profile_photo
    ? user.profile_photo
    : "https://www.shutterstock.com/image-vector/male-avatar-profile-picture-vector-260nw-221431012.jpg";

  return (
    <>
      <img src={photo} alt="" />
    </>
  );
};

export default Avatar;
