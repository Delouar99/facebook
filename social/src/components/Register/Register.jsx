import React from "react";
import { useState } from "react";
import crossbtn from "../../assets/icons/cross.png";
import CreateToast from "../../Utility/Toast";
import { useDispatch } from "react-redux";
import { userRegister } from "../../redux/auth/authAction.js";
import { useNavigate } from "react-router-dom";

//reg day
const day = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30, 31,
];

//reg month
const month = [
  "Jan",
  "Feb",
  " Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

//year
const years = Array.from(
  { length: 100 },
  (_, i) => new Date().getFullYear() - i
);

const Register = ({ setRegister }) => {
  //activation navigate
  const navigate = useNavigate();

  const date = new Date();

  const [input, setInput] = useState({
    fname: "",
    sname: "",
    emailornumber: "",
    pass: "",
    day: date.getDate(),
    month: month[date.getMonth()],
    year: date.getFullYear(),
    gender: "",
  });

  //validate state

  const [validate, setValidate] = useState({
    fname: false,
    sname: false,
    emailornumber: false,
    pass: false,
  });

  //onchange input
  const handleInputchange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  //handle input validate
  const handleInputvalidate = (e) => {
    const fieldname = e.target.name;

    if (!input[fieldname]) {
      setValidate((prevState) => ({
        ...prevState,
        [fieldname]: true,
      }));
    } else {
      setValidate((prevState) => ({
        ...prevState,
        [fieldname]: false,
      }));
    }
  };

  //handle input focus
  const handleInputFocus = (e) => {
    const fieldname = e.target.name;
    setValidate((prevState) => ({
      ...prevState,
      [fieldname]: false,
    }));
  };

  //dispatch use
  const dispatch = useDispatch();

  //handle form submit
  const handleFormSubmit = (e) => {
    e.preventDefault();

    //check validation
    if (
      !input.fname ||
      !input.sname ||
      !input.emailornumber ||
      !input.pass ||
      !input.day ||
      !input.month ||
      !input.year ||
      !input.gender
    ) {
      CreateToast("All Feilds are Required", "warn");
    } else {
      dispatch(
        userRegister(
          {
            first_name: input.fname,
            sur_name: input.sname,
            auth: input.emailornumber,
            password: input.pass,
            gender: input.gender,
            birth_date: input.day,
            birth_month: input.month,
            birth_year: input.year,
          },
          setInput,
          e,
          setRegister,
          navigate
        )
      );
    }
  };

  return (
    <div className="blur-box">
      <div className="sign-up-card">
        <div className="sign-up-header">
          <div className="sign-up-content">
            <span>Sign Up</span>
            <span>It's quick and easy.</span>
          </div>
          <button onClick={() => setRegister(false)}>
            <img src={crossbtn} alt="" />
          </button>
        </div>
        <div className="sign-up-body">
          <form onSubmit={handleFormSubmit}>
            <div className="reg-form reg-form-inline">
              <input
                type="text"
                name="fname"
                className={validate.fname && "error_border"}
                value={input.fname}
                onChange={handleInputchange}
                onBlur={handleInputvalidate}
                onFocus={handleInputFocus}
                placeholder="First Name"
              />

              <input
                type="text"
                className={validate.sname && "error_border"}
                name="sname"
                onChange={handleInputchange}
                onBlur={handleInputvalidate}
                onFocus={handleInputFocus}
                value={input.sname}
                placeholder="Surname"
              />
            </div>

            <div className="reg-form">
              <input
                type="text"
                className={validate.emailornumber && "error_border"}
                name="emailornumber"
                onChange={handleInputchange}
                onFocus={handleInputFocus}
                value={input.emailornumber}
                onBlur={handleInputvalidate}
                placeholder="Mobile number or email address"
              />
            </div>
            <div className="reg-form">
              <input
                type="password"
                className={validate.pass && "error_border"}
                name="pass"
                onBlur={handleInputvalidate}
                onFocus={handleInputFocus}
                onChange={handleInputchange}
                value={input.pass}
                placeholder="New password"
              />
            </div>
            <div className="reg-form">
              <span>Date of birth</span>
              <div className="reg-form-select">
                <select name="day" id="" onChange={handleInputchange}>
                  {day.map((item, index) => (
                    <option
                      selected={item === input.day ? true : false}
                      value={item}
                      key={index}
                    >
                      {item}
                    </option>
                  ))}
                </select>
                <select name="month" id="" onChange={handleInputchange}>
                  {month.map((item, index) => (
                    <option
                      selected={item === input.month ? true : false}
                      value={item}
                      key={index}
                    >
                      {item}
                    </option>
                  ))}
                </select>
                <select name="year" id="" onChange={handleInputchange}>
                  {years.map((item, index) => (
                    <option value={item} key={index}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="reg-form">
              <span>Gender</span>
              <div className="reg-form-select">
                <label>
                  Female
                  <input
                    onChange={handleInputchange}
                    type="radio"
                    name="gender"
                    value="Female"
                  />
                </label>
                <label>
                  Male
                  <input
                    onChange={handleInputchange}
                    type="radio"
                    name="gender"
                    value="Male"
                  />
                </label>
                <label>
                  Custom
                  <input
                    onChange={handleInputchange}
                    type="radio"
                    name="gender"
                    value="Custom"
                  />
                </label>
              </div>
            </div>

            <div className="reg-form">
              <p>
                People who use our service may have uploaded your contact
                information to Facebook. <a href="#">Learn more.</a>
              </p>
            </div>
            <div className="reg-form">
              <p>
                By clicking Sign Up, you agree to our <a href="#">Terms</a>,{" "}
                <a href="#">Privacy Policy</a> and{" "}
                <a href="#">Cookies Policy</a>. You may receive SMS
                notifications from us and can opt out at any time.
              </p>
            </div>

            <div className="reg-form">
              <button type="submit">Sign Up</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
