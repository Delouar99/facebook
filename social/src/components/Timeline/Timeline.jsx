import React from "react";
import CreatePost from "../CreatePost/CreatePost";
import Userpost from "../userpost/Userpost";

const Timeline = () => {
  return (
    <>
      <div className="fb-home-timeline-area">
        <div className="fb-home-timeline">
          <CreatePost />
          <Userpost />
        </div>
      </div>
    </>
  );
};

export default Timeline;
