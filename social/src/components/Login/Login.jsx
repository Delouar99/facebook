import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import createToast from "../../Utility/Toast";
import { useDispatch } from "react-redux";
import { userLogin } from "../../redux/auth/authAction";
function Login({ setRegister }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [input, setInput] = useState({
    auth: "",
    password: "",
  });

  //onChange={handleInputchange}

  const handleInputchange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  //handleUserSubmit

  const handleUserSubmit = (e) => {
    e.preventDefault();

    if (!input.auth || !input.password) {
      createToast("All Field Are Requerd", "warn");
    } else {
      dispatch(
        userLogin({ auth: input.auth, password: input.password }, navigate)
      );
    }
  };

  return (
    <>
      <div className="auth-box">
        <form onSubmit={handleUserSubmit}>
          <div className="auth-form">
            <input
              name="auth"
              value={input.auth}
              onChange={handleInputchange}
              type="text"
              placeholder="Email address or phone number"
            />
          </div>
          <div className="auth-form">
            <input
              name="password"
              value={input.password}
              onChange={handleInputchange}
              type="password"
              placeholder="Password"
            />
          </div>
          <div className="auth-form">
            <button type="submit">Log In</button>
          </div>
        </form>

        <Link to="/forgot-password">Forgotten password?</Link>

        <div className="divider"></div>

        <button onClick={() => setRegister(true)}>Create New Account</button>
      </div>
    </>
  );
}

export default Login;
