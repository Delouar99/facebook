import React from "react";
import "./Clickupdate.css";
const Clickupdate = ({ placeholder, hide, data }) => {
  return (
    <>
      {" "}
      <div className="click-update">
        <textarea
          placeholder={placeholder}
          onChange={(e) => data.setData(e.target.value)}
        >
          {data.data}
        </textarea>
        <div className="click-update-btn">
          <div className="bio-status">
            <div
              style={{
                backgroundImage: `url('https://static.xx.fbcdn.net/rsrc.php/v3/yD/r/HgfBXTEArfp.png?_nc_eui2=AeENO8XbxiYkjTmqVHWC_Whwc6lHD9kG4H5zqUcP2QbgfihyJOwsOIr2aH211cLRveKKfyW5MnHBE8Bk2-ABpi_W')`,
              }}
              className="earth-icon"
            ></div>
            <h5>Public</h5>
          </div>
          <div className="bio-btn">
            <button onClick={() => hide(false)}>cancel</button>
            <button onClick={data.save} className="blue">
              save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Clickupdate;
