import React from "react";
import { useSelector } from "react-redux";
import "../../assets/images/user.png";
const Storybox = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <>
      <div className="story-box">
        <div className="story-box-header">
          <ul>
            <li>
              <a href="#">
                <svg
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  width="1em"
                  height="1em"
                  className="x1lliihq x1k90msu x2h7rmj x1qfuztq x1qq9wsj x1qx5ct2 xw4jnvo"
                >
                  <g fillRule="evenodd" transform="translate(-446 -350)">
                    <path d="M457 368.832a.5.5 0 0 0 .883.323l1.12-1.332a.876.876 0 0 1 .679-.323h3.522a2.793 2.793 0 0 0 2.796-2.784v-10.931a2.793 2.793 0 0 0-2.796-2.785h-3.454a2.75 2.75 0 0 0-2.75 2.75v15.082zm-1.5 0a.5.5 0 0 1-.883.323l-1.12-1.332a.876.876 0 0 0-.679-.323h-3.522a2.793 2.793 0 0 1-2.796-2.784v-10.931a2.793 2.793 0 0 1 2.796-2.785h3.454a2.75 2.75 0 0 1 2.75 2.75v15.082z" />
                  </g>
                </svg>
                <span>Stories</span>
              </a>
            </li>
            <li>
              <a href="#">
                <svg
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  width="1em"
                  height="1em"
                  className="x1lliihq x1k90msu x2h7rmj x1qfuztq xcza8v6 x1qx5ct2 xw4jnvo"
                >
                  <g fillRule="evenodd" transform="translate(-446 -350)">
                    <path d="M454.59 355h4.18l-2.4-4h-3.28c-.22 0-.423.008-.624.017L454.59 355zm6.514 0h3.695c-.226-1.031-.65-1.79-1.326-2.489-1.061-1.025-2.248-1.488-4.392-1.511h-.379l2.401 4zm-8.78 0-1.942-3.64c-.73.247-1.315.63-1.868 1.165-.668.69-1.09 1.445-1.315 2.475h5.125zm7.043 7.989a.711.711 0 0 1-.22.202l-4.573 2.671-.05.027a.713.713 0 0 1-1.024-.643v-5.343l.002-.056a.714.714 0 0 1 1.072-.56l4.572 2.67.054.036a.714.714 0 0 1 .167.996zm-12.366-5.99V363.083l.001.03v.112l.005.048h.001c.05 2.02.513 3.176 1.506 4.203 1.102 1.066 2.324 1.525 4.577 1.525h5.99c2.144-.023 3.331-.486 4.392-1.511 1.005-1.04 1.467-2.198 1.517-4.217h.003c.003-.1.005-.1.006-.204l.001-.156V357h-18z" />
                  </g>
                </svg>
                <span>Reels</span>
              </a>
            </li>

            <li>
              <a href="#">
                <svg
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  width="1em"
                  height="1em"
                  className="x1lliihq x1k90msu x2h7rmj x1qfuztq xcza8v6 x1qx5ct2 xw4jnvo"
                >
                  <g fillRule="evenodd" transform="translate(-446 -350)">
                    <path d="M457.25 361H455v2.25a1 1 0 0 1-2 0V361h-2.25a1 1 0 0 1 0-2H453v-2.25a1 1 0 0 1 2 0V359h2.25a1 1 0 0 1 0 2m8.241-5.889a.962.962 0 0 0-.998.063L462 356.938v-1.188a2.754 2.754 0 0 0-2.75-2.75h-10.5a2.754 2.754 0 0 0-2.75 2.75v8.5a2.754 2.754 0 0 0 2.75 2.75h10.5a2.754 2.754 0 0 0 2.75-2.75v-1.188l2.503 1.77a.953.953 0 0 0 .988.057.95.95 0 0 0 .509-.841v-8.096a.95.95 0 0 0-.509-.841"></path>
                  </g>
                </svg>
                <span>Rooms</span>
              </a>
            </li>
          </ul>
        </div>
        <div className="story-box-body">
          <div className="story-area">
            <div
              className="story-item auth-user-story"
              style={{
                backgroundImage: `url("https://media.licdn.com/dms/image/C4D03AQEl7GdpSRFxNQ/profile-displayphoto-shrink_800_800/0/1655487899594?e=2147483647&v=beta&t=vOse5BuPmoDxKEE4z4s4wZLeuUTv7sV9TyBA6iH-I2w")`,
              }}
            >
              <div className="auth-story-create">
                <button>
                  <svg
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    width="1em"
                    height="1em"
                    className="x1lliihq x1k90msu x2h7rmj x1qfuztq x14ctfv x1qx5ct2 xw4jnvo"
                  >
                    <g fillRule="evenodd" transform="translate(-446 -350)">
                      <g fillRule="nonzero">
                        <path
                          d="M95 201.5h13a1 1 0 1 0 0-2H95a1 1 0 1 0 0 2z"
                          transform="translate(354.5 159.5)"
                        ></path>
                        <path
                          d="M102.5 207v-13a1 1 0 1 0-2 0v13a1 1 0 1 0 2 0z"
                          transform="translate(354.5 159.5)"
                        ></path>
                      </g>
                    </g>
                  </svg>
                </button>
                <p>Create Story</p>
              </div>
            </div>

            <div
              className="story-item"
              style={{
                backgroundImage: `url("https://media.licdn.com/dms/image/C4D03AQEl7GdpSRFxNQ/profile-displayphoto-shrink_800_800/0/1655487899594?e=2147483647&v=beta&t=vOse5BuPmoDxKEE4z4s4wZLeuUTv7sV9TyBA6iH-I2w")`,
              }}
            >
              <div className="story-user">
                <img
                  src="https://media.licdn.com/dms/image/C4D03AQEl7GdpSRFxNQ/profile-displayphoto-shrink_800_800/0/1655487899594?e=2147483647&v=beta&t=vOse5BuPmoDxKEE4z4s4wZLeuUTv7sV9TyBA6iH-I2w"
                  alt=""
                />
              </div>
              <span>{`${user.first_name} ${user.sur_name}`}</span>
            </div>

            <div
              className="story-item"
              style={{
                backgroundImage: `url("https://media.licdn.com/dms/image/C4D03AQEl7GdpSRFxNQ/profile-displayphoto-shrink_800_800/0/1655487899594?e=2147483647&v=beta&t=vOse5BuPmoDxKEE4z4s4wZLeuUTv7sV9TyBA6iH-I2w")`,
              }}
            >
              <div className="story-user">
                <img
                  src="https://media.licdn.com/dms/image/C4D03AQEl7GdpSRFxNQ/profile-displayphoto-shrink_800_800/0/1655487899594?e=2147483647&v=beta&t=vOse5BuPmoDxKEE4z4s4wZLeuUTv7sV9TyBA6iH-I2w"
                  alt=""
                />
              </div>
              <span>{`${user.first_name} ${user.sur_name}`}</span>
            </div>

            <div
              className="story-item"
              style={{
                backgroundImage: `url("https://media.licdn.com/dms/image/C4D03AQEl7GdpSRFxNQ/profile-displayphoto-shrink_800_800/0/1655487899594?e=2147483647&v=beta&t=vOse5BuPmoDxKEE4z4s4wZLeuUTv7sV9TyBA6iH-I2w")`,
              }}
            >
              <div className="story-user">
                <img
                  src="https://media.licdn.com/dms/image/C4D03AQEl7GdpSRFxNQ/profile-displayphoto-shrink_800_800/0/1655487899594?e=2147483647&v=beta&t=vOse5BuPmoDxKEE4z4s4wZLeuUTv7sV9TyBA6iH-I2w"
                  alt=""
                />
              </div>
              <span>{`${user.first_name} ${user.sur_name}`}</span>
            </div>

            <div
              className="story-item"
              style={{
                backgroundImage: `url("https://media.licdn.com/dms/image/C4D03AQEl7GdpSRFxNQ/profile-displayphoto-shrink_800_800/0/1655487899594?e=2147483647&v=beta&t=vOse5BuPmoDxKEE4z4s4wZLeuUTv7sV9TyBA6iH-I2w")`,
              }}
            >
              <div className="story-user">
                <img
                  src="https://media.licdn.com/dms/image/C4D03AQEl7GdpSRFxNQ/profile-displayphoto-shrink_800_800/0/1655487899594?e=2147483647&v=beta&t=vOse5BuPmoDxKEE4z4s4wZLeuUTv7sV9TyBA6iH-I2w"
                  alt=""
                />
              </div>
              <span>{`${user.first_name} ${user.sur_name}`}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Storybox;
