import React from "react";
import CreatePost from "../CreatePost/CreatePost";
import Storybox from "../Storybox/Storybox";
import Userpost from "../userpost/Userpost";

const Timeline = () => {
  return (
    <>
      <div className="fb-home-timeline-area">
        <div className="fb-home-timeline">
          <Storybox />
          <CreatePost />
          <Userpost />
        </div>
      </div>
    </>
  );
};

export default Timeline;
