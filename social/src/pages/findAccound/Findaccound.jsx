import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import headerlogo from "../../assets/icons/facebook.svg";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { hedeMObileEmail } from "../../Utility/Helper.js";
import axios from "axios";
import createToast from "../../Utility/Toast";

const Findaccound = () => {
  const navigate = useNavigate();

  //reset user data set
  const [findUser, setFindUser] = useState({
    name: "",
    email: "",
    mobile: "",
    photo: "",
  });

  //handlepasswordresetLink
  const handlepasswordresetLink = async (e) => {
    e.preventDefault();

    await axios
      .post("/api/v1/user/resend-password-otp", {
        auth: findUser.mobile ?? findUser.email,
      })
      .then((res) => {
        createToast(res.data.message, "success");
        navigate("/activation/reset-pass");
      })
      .catch((error) => {
        createToast(error.response.data.message);
      });
  };

  //not you
  const handlenotU = (e) => {
    e.preventDefault();
    Cookies.remove("findUser");
    navigate("/forgot-password");
  };

  useEffect(() => {
    //get all cookie data

    const userData = JSON.parse(Cookies.get("findUser")) ?? null;

    if (userData) {
      setFindUser({
        name: userData.name,
        email: userData.email ?? null,
        mobile: userData.mobile ?? null,
        photo: userData.profile_photo,
      });
    }
  }, []);

  return (
    <>
      <div className="reset-header">
        <div className="reset-header-wraper">
          <div className="reset-logo">
            <img src={headerlogo} alt="" />
          </div>
          <div className="login-part">
            <input type="text" placeholder="Email or mobile number" />
            <input type="text" placeholder="Password" />
            <button>Log In</button>
            <a href="#">Forgotten account?</a>
          </div>
        </div>
      </div>

      <div className="reset-area">
        <div className="reset-wraper">
          <div className="reset-box">
            <div className="reset-box-header">
              <span className="title">Reset your password</span>
            </div>
            <div className="reset-body">
              <div className="find-user-account">
                <img
                  src={
                    findUser.photo
                      ? findUser.photo
                      : "https://p.kindpng.com/picc/s/78-785827_user-profile-avatar-login-account-male-user-icon.png"
                  }
                  alt=""
                />

                <span>{findUser.name}</span>
                {findUser.email && (
                  <p>Email : {hedeMObileEmail(findUser.email)}</p>
                )}
                {findUser.mobile && (
                  <p>Mobile : {hedeMObileEmail(findUser.mobile)}</p>
                )}

                <p>To reset your account password, please continue</p>
              </div>
            </div>
            <div className="reset-footer">
              <a href="#"></a>
              <div className="reset-btns">
                <a onClick={handlenotU} className="cancel" href="#">
                  Not you ?
                </a>
                <a
                  onClick={handlepasswordresetLink}
                  className="continue"
                  href="#"
                >
                  Continue
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fb-footer">
        <div className="footer-wraper">
          <div className="footer-top">
            <ul>
              <li>
                <a href="#">English (UK)</a>
              </li>
              <li>
                <a href="#">বাংলা</a>
              </li>
              <li>
                <a href="#">অসমীয়া</a>
              </li>
              <li>
                <a href="#">हिन्दी</a>
              </li>
              <li>
                <a href="#">नेपाली</a>
              </li>
              <li>
                <a href="#">Bahasa Indonesia</a>
              </li>
              <li>
                <a href="#">العربية</a>
              </li>
              <li>
                <a href="#">中文(简体)</a>
              </li>
              <li>
                <a href="#">Bahasa Melayu</a>
              </li>
              <li>
                <a href="#">Español</a>
              </li>
              <li>
                <a href="#">Português (Brasil)</a>
              </li>
            </ul>
          </div>
          <div className="divider-0"></div>
          <div className="footer-bottom">
            <ul>
              <li>
                <a href="#">Sign Up</a>
              </li>
              <li>
                <a href="#">Log in</a>
              </li>
              <li>
                <a href="#">Messenger</a>
              </li>
              <li>
                <a href="#">Facebook Lite</a>
              </li>
              <li>
                <a href="#">Watch</a>
              </li>
              <li>
                <a href="#">Places</a>
              </li>
              <li>
                <a href="#">Games</a>
              </li>
              <li>
                <a href="#">Marketplace</a>
              </li>
              <li>
                <a href="#">Meta Pay</a>
              </li>
              <li>
                <a href="#">Oculus</a>
              </li>
              <li>
                <a href="#">Portal</a>
              </li>
              <li>
                <a href="#">Instagram</a>
              </li>
              <li>
                <a href="#">Bulletin</a>
              </li>
              <li>
                <a href="#">Fundraisers</a>
              </li>
              <li>
                <a href="#">Services</a>
              </li>
              <li>
                <a href="#">Voting Information Centre</a>
              </li>
              <li>
                <a href="#">Groups</a>
              </li>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Create ad</a>
              </li>
              <li>
                <a href="#">Create Page</a>
              </li>
              <li>
                <a href="#">Developers</a>
              </li>
              <li>
                <a href="#">Careers</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <a href="#">Privacy Centre</a>
              </li>
              <li>
                <a href="#">Cookies</a>
              </li>
              <li>
                <a href="#">AdChoices</a>
              </li>
              <li>
                <a href="#">Terms</a>
              </li>
              <li>
                <a href="#">Help</a>
              </li>
              <li>
                <a href="#">Contact uploading and non-users</a>
              </li>
              <li>
                <a href="#">Settings</a>
              </li>
              <li>
                <a href="#">Activity log</a>
              </li>
            </ul>
          </div>
          <p>Meta © 2022</p>
        </div>
      </div>
    </>
  );
};

export default Findaccound;
