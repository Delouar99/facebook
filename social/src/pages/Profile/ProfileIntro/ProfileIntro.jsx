import e from "express";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Clickupdate from "../../../components/Clickupdate/Clickupdate";
import FbCard from "../../../components/Fb-cr/FbCard";
import Fbmodal from "../../../components/Fbmodal/Fbmodal";
import { profileUpdate } from "../../../redux/auth/authAction";

const ProfileIntro = () => {
  const { user } = useSelector((state) => state.auth);
  const [bioShow, setBioShow] = useState(false);
  const [bio, setBio] = useState(user.bio ? user.bio : "");
  const [remain, setRemain] = useState(101 - bio.length);
  const [savebtn, setSavebtn] = useState(true);
  const [editDetails, setEditDetails] = useState(false);
  const [catShow, setCatShow] = useState(false);
  const [cat, setCat] = useState();

  const dispatch = useDispatch();

  const handlebioSHow = (e) => {
    setBioShow(!bioShow);
  };

  const handleBIochang = (e) => {
    setBio(e.target.value);
    setRemain(101 - e.target.value.length);
    setSavebtn(false);

    if (remain <= 0) {
      setSavebtn(true);
    }
  };

  const handlebioupdate = (e) => {
    e.preventDefault();
    dispatch(profileUpdate({ bio }, user._id, setBioShow));
  };

  const handlecatShow = (e) => {
    e.preventDefault();
    setCatShow(!catShow);
  };

  const handleUpdateCat = (e) => {
    e.preventDefault();
    dispatch(profileUpdate({ catagory: cat }, user._id, setCatShow));
  };

  return (
    <FbCard>
      <div className="user_personal_info">
        <h3>intro</h3>
        <div className="bio">
          {user.bio && !bioShow && (
            <>
              <p>{user.bio}</p>
              <button className="personal-info-btn" onClick={handlebioSHow}>
                Edid Bio
              </button>
            </>
          )}

          {!user.bio && !bioShow && (
            <>
              <button className="personal-info-btn" onClick={handlebioSHow}>
                Add Bio
              </button>
            </>
          )}

          {bioShow && (
            <div className="click-update">
              <textarea
                placeholder="Descrive Who you are"
                onChange={handleBIochang}
              >
                {user.bio}
              </textarea>
              <p>{remain} creacter remaning</p>
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
                  <button onClick={handlebioSHow}>cancel</button>
                  <button
                    className={`${!savebtn && "active-save-btn"} `}
                    onClick={handlebioupdate}
                    disabled={savebtn}
                  >
                    save
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="personal-info-details">
          <ul>
            <li>
              <img
                src="https://static.xx.fbcdn.net/rsrc.php/v3/yp/r/Q9Qu4uLgzdm.png?_nc_eui2=AeFOmXJSZv3c_0IVmbQeSd1tQE0O-ZdJm-NATQ75l0mb40EQxEZPwsXXxDU8uDz0wFSWs0I_PL4_cBOz5dQBRTR5"
                alt=""
              />
              Profile - <span className="blod-text"> Digital Creator</span>
            </li>
            <li>
              <img
                src="https://static.xx.fbcdn.net/rsrc.php/v3/yS/r/jV4o8nAgIEh.png?_nc_eui2=AeF0RU3uFhTVOUhpfZTUStabC7xezJFSLOkLvF7MkVIs6dDT1KnIyVGjtqbOMOFgqMf6Xt9iIHfYtlrAsHVuKcVW"
                alt=""
              />
              Went to{" "}
              <span className="blod-text"> Madhabpur Pilot High school</span>
            </li>
            <li>
              <img
                src="https://static.xx.fbcdn.net/rsrc.php/v3/y5/r/VMZOiSIJIwn.png?_nc_eui2=AeFfE8bfoRWM_UnUgbMxNiqmysO07LK9kRPKw7Tssr2RE4bizSi3Dm2Rs9WsrtP9Xv8Z5M_DUP-a9aiPp25dABGs"
                alt=""
              />
              Live in <span className="blod-text">Dhaka, Bangladesh</span>
            </li>
            <li>
              <img
                src="https://static.xx.fbcdn.net/rsrc.php/v3/yc/r/-e1Al38ZrZL.png?_nc_eui2=AeHCEJCtYfkHo2tFGgPNWryWyuB9xaeJwC_K4H3Fp4nALx7QIaSiF6nPrX9ZAWOnYueBx8RToSkimAlmi1h4APMu"
                alt=""
              />
              From<span className="blod-text">Dhaka Bangladesh</span>
            </li>
          </ul>
          {editDetails && (
            <Fbmodal title="Edit Details" closePopup={setEditDetails}>
              <div className="profile-intro">
                <div className="modal-header">
                  <span className="header-title">Customise your Intro</span>
                  <span className="header-subtitle">
                    Details you select will be public.
                  </span>
                </div>
                <div className="profile-intro-item">
                  <span className="intro-title">Catagory</span>
                  {!catShow && (
                    <a onClick={handlecatShow} href="#">
                      <img
                        src="https://static.xx.fbcdn.net/rsrc.php/v3/yG/r/OcOuC5vm3rq.png?_nc_eui2=AeGc16gUmsxdRZnmL23eq0MOXco6tKIYP1Fdyjq0ohg_UQYJGclFJw6tAZuNJFuUezwGLYAn-XiZGQHSLwHZfUYi"
                        alt=""
                      />
                      <span className="intro-name">Add a Catagory</span>
                    </a>
                  )}
                  {catShow && (
                    <Clickupdate
                      placeholder="See your profile catagory"
                      hide={setCatShow}
                      data={{
                        data: cat,
                        setData: setCat,
                        save: handleUpdateCat,
                      }}
                    />
                  )}
                </div>
                <div className="profile-intro-item">
                  <span className="intro-title">Work</span>
                  <a href="#">
                    <img
                      src="https://static.xx.fbcdn.net/rsrc.php/v3/yG/r/OcOuC5vm3rq.png?_nc_eui2=AeGc16gUmsxdRZnmL23eq0MOXco6tKIYP1Fdyjq0ohg_UQYJGclFJw6tAZuNJFuUezwGLYAn-XiZGQHSLwHZfUYi"
                      alt=""
                    />
                    <span className="intro-name">Add a workplce</span>
                  </a>
                </div>
                <div className="profile-intro-item">
                  <span className="intro-title">Education</span>
                  <a href="#">
                    <img
                      src="https://static.xx.fbcdn.net/rsrc.php/v3/yG/r/OcOuC5vm3rq.png?_nc_eui2=AeGc16gUmsxdRZnmL23eq0MOXco6tKIYP1Fdyjq0ohg_UQYJGclFJw6tAZuNJFuUezwGLYAn-XiZGQHSLwHZfUYi"
                      alt=""
                    />
                    <span className="intro-name">
                      Add Secondary high school
                    </span>
                  </a>
                  <a href="#">
                    <img
                      src="https://static.xx.fbcdn.net/rsrc.php/v3/yG/r/OcOuC5vm3rq.png?_nc_eui2=AeGc16gUmsxdRZnmL23eq0MOXco6tKIYP1Fdyjq0ohg_UQYJGclFJw6tAZuNJFuUezwGLYAn-XiZGQHSLwHZfUYi"
                      alt=""
                    />
                    <span className="intro-name">Add University</span>
                  </a>
                </div>
                <div className="profile-intro-item">
                  <span className="intro-title">Current town/city</span>
                  <a href="#">
                    <img
                      src="https://static.xx.fbcdn.net/rsrc.php/v3/yG/r/OcOuC5vm3rq.png?_nc_eui2=AeGc16gUmsxdRZnmL23eq0MOXco6tKIYP1Fdyjq0ohg_UQYJGclFJw6tAZuNJFuUezwGLYAn-XiZGQHSLwHZfUYi"
                      alt=""
                    />
                    <span className="intro-name">Add a Current city</span>
                  </a>
                </div>
                <div className="profile-intro-item">
                  <span className="intro-title">Home Town</span>
                  <a href="#">
                    <img
                      src="https://static.xx.fbcdn.net/rsrc.php/v3/yG/r/OcOuC5vm3rq.png?_nc_eui2=AeGc16gUmsxdRZnmL23eq0MOXco6tKIYP1Fdyjq0ohg_UQYJGclFJw6tAZuNJFuUezwGLYAn-XiZGQHSLwHZfUYi"
                      alt=""
                    />
                    <span className="intro-name">Add a Home Town</span>
                  </a>
                </div>
                <div className="profile-intro-item">
                  <span className="intro-title">Relationship</span>
                  <a href="#">
                    <img
                      src="https://static.xx.fbcdn.net/rsrc.php/v3/yG/r/OcOuC5vm3rq.png?_nc_eui2=AeGc16gUmsxdRZnmL23eq0MOXco6tKIYP1Fdyjq0ohg_UQYJGclFJw6tAZuNJFuUezwGLYAn-XiZGQHSLwHZfUYi"
                      alt=""
                    />
                    <span className="intro-name">
                      Add a Relationship status
                    </span>
                  </a>
                </div>
                <div className="profile-intro-item">
                  <span className="intro-title">Relationship</span>
                  <a href="#">
                    <img
                      src="https://static.xx.fbcdn.net/rsrc.php/v3/yG/r/OcOuC5vm3rq.png?_nc_eui2=AeGc16gUmsxdRZnmL23eq0MOXco6tKIYP1Fdyjq0ohg_UQYJGclFJw6tAZuNJFuUezwGLYAn-XiZGQHSLwHZfUYi"
                      alt=""
                    />
                    <span className="intro-name">
                      Add a Relationship status
                    </span>
                  </a>
                </div>
                <div className="profile-intro-item">
                  <span className="intro-title">Website</span>
                  <a href="#">
                    <img
                      src="https://static.xx.fbcdn.net/rsrc.php/v3/yG/r/OcOuC5vm3rq.png?_nc_eui2=AeGc16gUmsxdRZnmL23eq0MOXco6tKIYP1Fdyjq0ohg_UQYJGclFJw6tAZuNJFuUezwGLYAn-XiZGQHSLwHZfUYi"
                      alt=""
                    />
                    <span className="intro-name">Add a Website</span>
                  </a>
                </div>
                <div className="profile-intro-item">
                  <span className="intro-title">Socil Link</span>
                  <a href="#">
                    <img
                      src="https://static.xx.fbcdn.net/rsrc.php/v3/yG/r/OcOuC5vm3rq.png?_nc_eui2=AeGc16gUmsxdRZnmL23eq0MOXco6tKIYP1Fdyjq0ohg_UQYJGclFJw6tAZuNJFuUezwGLYAn-XiZGQHSLwHZfUYi"
                      alt=""
                    />
                    <span className="intro-name">Add your social Link</span>
                  </a>
                </div>
              </div>

              <div className="profile-model-footer">
                <span className="update-info">Update your information</span>
                <div className="update-btn">
                  <button onClick={() => setEditDetails(!editDetails)}>
                    Cancel
                  </button>
                  <button className="blue">Save</button>
                </div>
              </div>
            </Fbmodal>
          )}

          <button
            onClick={() => setEditDetails(!editDetails)}
            className="personal-info-btn"
          >
            Edit details
          </button>
        </div>
        <div className="hobbies">
          <div className="hobbies-list">
            <div className="hobbies-list-item">
              <img
                src="https://images.pexels.com/photos/87651/earth-blue-planet-globe-planet-87651.jpeg?cs=srgb&dl=pexels-pixabay-87651.jpg&fm=jpg"
                alt=""
              />
              <span>Traveling</span>
            </div>
            <div className="hobbies-list-item">
              <img
                src="https://images.pexels.com/photos/87651/earth-blue-planet-globe-planet-87651.jpeg?cs=srgb&dl=pexels-pixabay-87651.jpg&fm=jpg"
                alt=""
              />
              <span>Traveling</span>
            </div>
            <div className="hobbies-list-item">
              <img
                src="https://images.pexels.com/photos/87651/earth-blue-planet-globe-planet-87651.jpeg?cs=srgb&dl=pexels-pixabay-87651.jpg&fm=jpg"
                alt=""
              />
              <span>Traveling</span>
            </div>
            <div className="hobbies-list-item">
              <img
                src="https://images.pexels.com/photos/87651/earth-blue-planet-globe-planet-87651.jpeg?cs=srgb&dl=pexels-pixabay-87651.jpg&fm=jpg"
                alt=""
              />
              <span>Traveling</span>
            </div>
            <div className="hobbies-list-item">
              <img
                src="https://images.pexels.com/photos/87651/earth-blue-planet-globe-planet-87651.jpeg?cs=srgb&dl=pexels-pixabay-87651.jpg&fm=jpg"
                alt=""
              />
              <span>Traveling</span>
            </div>
          </div>
          <button className="personal-info-btn">Edit hobbies</button>
        </div>
        <div className="profile-featured">
          <div className="profile-featured-gallery">
            <div
              style={{
                backgroundImage:
                  "url('https://media.licdn.com/dms/image/C4D03AQEl7GdpSRFxNQ/profile-displayphoto-shrink_800_800/0/1655487899594?e=2147483647&v=beta&t=vOse5BuPmoDxKEE4z4s4wZLeuUTv7sV9TyBA6iH-I2w')",
              }}
              className="profile-feature-item"
            >
              <span className="featured-count">+35</span>
            </div>
            <div
              style={{
                backgroundImage:
                  "url('https://media.licdn.com/dms/image/C4D03AQEl7GdpSRFxNQ/profile-displayphoto-shrink_800_800/0/1655487899594?e=2147483647&v=beta&t=vOse5BuPmoDxKEE4z4s4wZLeuUTv7sV9TyBA6iH-I2w')",
              }}
              className="profile-feature-item"
            >
              <span className="featured-count">+53</span>
            </div>
            <div
              style={{
                backgroundImage:
                  "url('https://media.licdn.com/dms/image/C4D03AQEl7GdpSRFxNQ/profile-displayphoto-shrink_800_800/0/1655487899594?e=2147483647&v=beta&t=vOse5BuPmoDxKEE4z4s4wZLeuUTv7sV9TyBA6iH-I2w')",
              }}
              className="profile-feature-item"
            >
              <span className="featured-count">+33</span>
            </div>
          </div>
          <button className="personal-info-btn">Add Featured</button>
        </div>
      </div>
    </FbCard>
  );
};

export default ProfileIntro;
