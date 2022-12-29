import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import facebookLogo from "../../assets/icons/facebook.svg";
import cookie from "js-cookie";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  activationByOTP,
  checkPasswordresetCode,
  resendLink,
} from "../../redux/auth/authAction";
import createToast from "../../Utility/Toast";

const Activation = () => {
  const { type } = useParams();

  //code state
  const [code, setCode] = useState("");

  //dispatch
  const dispatch = useDispatch();

  //navigate
  const navigate = useNavigate();

  //activation emaail
  const activationEmail = cookie.get("otp");

  const handleResendLink = (e) => {
    e.preventDefault();

    dispatch(resendLink(activationEmail, navigate));
  };

  useEffect(() => {
    //validate time
    if (!activationEmail) {
      navigate("/login");
    }
  });

  //handlePasswordreset
  const handlePasswordreset = (e) => {
    e.preventDefault();

    if (!code) {
      createToast("otp Code is Requerd", "warn");
    } else {
      dispatch(
        checkPasswordresetCode(
          {
            code: code,
            auth: cookie.get("otp"),
          },
          navigate
        )
      );
    }
  };

  //handleActivationcancel
  const handleActivationcancel = (e) => {
    e.parventDefault();
    cookie.remove("otp");
    navigate("/login");
  };

  //handleCodechange

  const handleCodechange = (e) => {
    setCode(e.target.value);
  };

  //handleCOdeContinue
  const handleCOdeContinue = (e) => {
    e.preventDefault();
    if (!code) {
      createToast("OTP IS REQUED", "warn");
    } else {
      dispatch(
        activationByOTP(
          {
            code: code,
            email: cookie.get("otp"),
          },
          navigate
        )
      );
    }
  };

  return (
    <>
      <div className="reset-header">
        <div className="reset-header-wraper">
          <div className="reset-logo">
            <img src={facebookLogo} alt="" />
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
              <span className="title">Enter security code</span>
            </div>
            <div className="reset-body">
              <p>
                Please check your emails for a message with your code. Your code
                is 6 numbers long.
              </p>
              <div className="code-box">
                <input type="text" value={code} onChange={handleCodechange} />
                <div className="code-text">
                  <span>We sent your code to: </span>
                  <span>{activationEmail}</span>
                </div>
              </div>
            </div>
            <div className="reset-footer">
              <a onClick={handleResendLink} href="#">
                Didn't get a code?
              </a>
              <div className="reset-btns">
                <a onClick={handleActivationcancel} className="cancel" href="#">
                  Cancel
                </a>
                <a
                  onClick={
                    type == "account" ? handleCOdeContinue : handlePasswordreset
                  }
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

export default Activation;
