import React from "react";
import "./Fbmodal.css";
import cross from "../../assets/icons/cross.png";
const Fbmodal = ({ children, title, closePopup }) => {
  return (
    <>
      <div className="blur-box">
        <div className="Fb-modalwraper">
          <div className="fb-modal-popup">
            <div className="fb-modal-header">
              <span className="title">{title}</span>
              <button onClick={() => closePopup(false)}>
                <img src={cross} alt="" />
              </button>
            </div>
            <div className="fb-modal-body">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Fbmodal;
