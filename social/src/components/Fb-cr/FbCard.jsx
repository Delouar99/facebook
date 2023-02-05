import React from "react";
import "./FbCard.css";
const FbCard = ({ children }) => {
  return (
    <>
      <div className="fb-card">
        <div className="card-wraper">{children}</div>
      </div>
    </>
  );
};

export default FbCard;
