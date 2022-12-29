import Cookies from "js-cookie";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import headerlogo from "../../assets/icons/facebook.svg";

import { changePassword } from "../../redux/auth/authAction";
import createToast from "../../Utility/Toast";
const Password = () => {
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //handleInputChange
  const handleInputChange = (e) => {
    e.preventDefault();

    if (!password) {
      createToast("Password is Request");
    } else {
      dispatch(
        changePassword(
          {
            id: Cookies.get("cpid"),
            code: Cookies.get("cpcode"),
            Password,
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
              <span className="title">Choose a new password</span>
            </div>
            <div className="reset-body">
              <p>
                Create a new password that is at least 6 characters long. A
                strong password has a combination of letters, digits and
                punctuation marks.
              </p>
              <div className="code-box">
                <input
                  className="w-100"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="New password"
                />
              </div>
            </div>
            <div className="reset-footer">
              <a href="#"></a>
              <div className="reset-btns">
                <Link className="cancel" to="/login">
                  Skip
                </Link>
                <a className="continue" onClick={handleInputChange} href="#">
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

export default Password;
