import User from "../models/User.js";
import createError from "../utility/ErrorControler.js";
import { hashPassword, passwordVerify } from "../utility/hash.js";
import { getRandom } from "../utility/math.js";
import { forgotPasswordLink, SendEmail } from "../utility/SendEmail.js";
import { SenOTP } from "../utility/Sendsms.js";
import { createToken, tokenVerify } from "../utility/token.js";
import { isEmail, isMobile } from "../utility/validate.js";

/**
 * @access public
 * @route /api/register
 * @mehtod POST
 */

export const register = async (req, res, next) => {
  try {
    //get form data
    const {
      first_name,
      sur_name,
      auth,
      password,
      birth_date,
      birth_month,
      birth_year,
      gender,
    } = req.body;

    //validation
    if (!first_name || !sur_name || !auth || !password || !gender) {
      next(createError(400, "All feilds are required"));
    }

    //initial auth value
    let mobileData = null;
    let emailData = null;

    if (isEmail(auth)) {
      emailData = auth;

      //email check
      const emailCheck = await User.findOne({ email: auth });

      if (emailCheck) {
        return next(createError(400, "Email Already exists"));
      } else {
        let activationCode = getRandom(10000, 99999);

        //check activation code
        const checkCode = await User.findOne({ access_token: activationCode });

        if (checkCode) {
          activationCode = getRandom(10000, 99999);
        }

        const user = await User.create({
          first_name,
          sur_name,
          mobile: mobileData,
          email: emailData,
          password: hashPassword(password),
          gender,
          birth_date,
          birth_month,
          birth_year,
          access_token: activationCode,
        });

        if (user) {
          //create activation token
          const activationToken = createToken({ id: user._id }, "30d");

          //create activation mail
          SendEmail(user.email, {
            name: user.first_name + " " + user.sur_name,
            link: `${process.env.APP_URL}:${process.env.SERVER_PORT}/api/v1/user/activate/${activationToken}`,

            code: activationCode,
          });

          res
            .status(200)
            .cookie("otp", user.email, {
              expires: new Date(Date.now() + 1000 * 60 * 15),
            })
            .json({
              message: "User create successfully",
              user: user,
            });
        }
      }
    } else if (isMobile(auth)) {
      mobileData = auth;

      //mobile check
      const mobileCheck = await User.findOne({ mobile: auth });

      if (mobileCheck) {
        return next(createError(400, "Mobile Already exists"));
      } else {
        let activationCode = getRandom(10000, 99999);

        //check activation code
        const checkCode = await User.findOne({ access_token: activationCode });

        if (checkCode) {
          activationCode = getRandom(10000, 99999);
        }

        const user = await User.create({
          first_name,
          sur_name,
          mobile: mobileData,
          email: emailData,
          password: hashPassword(password),
          gender,
          birth_date,
          birth_month,
          birth_year,
          access_token: activationCode,
        });

        if (user) {
          //create activation token
          const activationToken = createToken({ id: user._id }, "30d");

          //send otp
          SenOTP(
            user.mobile,
            `HI ${user.first_name} ${user.sur_name}, your activation code is${activationCode}`
          );

          res
            .status(200)
            .cookie("otp", user.mobile, {
              expires: new Date(Date.now() + 1000 * 60 * 15),
            })
            .json({
              message: "User create successfully",
              user: user,
            });
        }
      }
    } else {
      next(createError(400, "Invalid Mobile or Email"));
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @access public
 * @route resendActivation
 * @mehtod POST
 */

export const resendActivation = async (req, res, next) => {
  const { auth } = req.body;

  try {
    //initial auth value
    let emailData = null;
    let mobileData = null;
    let emailCheck;
    let mobileCheck;

    if (isEmail(auth)) {
      emailData = auth;

      emailCheck = await User.findOne({ email: auth });

      if (!emailCheck) {
        return next(createError(400, "User Account not found"));
      }

      if (emailCheck.isActivate) {
        return next(createError(400, " Email User Account Already Activate"));
      }
    } else if (isMobile(auth)) {
      mobileData = auth;

      mobileCheck = await User.findOne({ mobile: auth });

      if (!mobileCheck) {
        return next(createError(400, "MObile User not found"));
      }

      if (mobileCheck.isActivate) {
        return next(createError(400, "Mobile User Account Already Activate"));
      }
    } else {
      return next(createError(400, "invalid mobile or email"));
    }

    //create access token
    let activationCode = getRandom(10000, 99999);

    //check activation code
    const checkCode = await User.findOne({ access_token: activationCode });

    if (checkCode) {
      activationCode = getRandom(10000, 99999);
    }

    //send mobile data
    if (mobileData) {
      //send otp
      SenOTP(
        mobileCheck.mobile,
        `HI ${mobileCheck.first_name} ${mobileCheck.sur_name}, your activation code is${activationCode}`
      );

      //update naw link
      await User.findByIdAndUpdate(mobileCheck._id, {
        access_token: activationCode,
      });

      res
        .status(200)
        .cookie("otp", mobileCheck.mobile, {
          expires: new Date(Date.now() + 1000 * 60 * 15),
        })
        .json({
          message: "Resend Otp Send Successfully",
        });
    }

    if (emailData) {
      //create activation token
      const activationToken = createToken({ id: emailCheck._id }, "30d");

      //create activation mail
      SendEmail(emailCheck.email, {
        name: emailCheck.first_name + " " + emailCheck.sur_name,
        link: `${process.env.APP_URL}:${process.env.SERVER_PORT}/api/v1/user/activate/${activationToken}`,

        code: activationCode,
      });

      //update naw link
      await User.findByIdAndUpdate(emailCheck._id, {
        access_token: activationCode,
      });

      res
        .status(200)
        .cookie("otp", emailCheck.email, {
          expires: new Date(Date.now() + 1000 * 60 * 15),
        })
        .json({
          message: "Activation link Send",
        });
    }
  } catch (error) {
    next(error.message);
  }
};

/**
 * @access public
 * @route /api/v1/login
 * @mehtod POST
 */

export const login = async (req, res, next) => {
  try {
    const { auth, password } = req.body;

    if (isEmail(auth)) {
      const emailCheck = await User.findOne({ email: auth });

      if (!emailCheck) {
        return next(createError(400, "Email user Not found"));
      } else {
        //check password
        const userPass = passwordVerify(password, emailCheck.password);

        if (!userPass) {
          return next(createError(400, "Password Not Match"));
        }

        if (userPass) {
          const token = createToken({ id: emailCheck._id }, "365d");
          return res.status(200).cookie("authToken", token).json({
            message: "user login successfully",
            user: emailCheck,
            token: token,
          });
        }
      }
    } else if (isMobile(auth)) {
      const mobileCheck = await User.findOne({ mobile: auth });

      if (!mobileCheck) {
        return next(createError(400, "Mobile user Not found"));
      } else {
        //check password
        const userPass = passwordVerify(password, mobileCheck.password);

        if (!userPass) {
          return next(createError(400, "Password Not Match"));
        }
        if (userPass) {
          const token = createToken({ id: mobileCheck._id }, "365d");

          return res.status(200).cookie("authToken", token).json({
            message: "user login successfully",
            user: mobileCheck,
            token: token,
          });
        }
      }
    } else {
      return next(createError(400, "invalid mobile or email"));
    }

    //user valid
    // const loginUser = await User.findOne({ email: auth });

    // if (!loginUser) {
    //   next(createError(400, "login user not found"));
    // } else {
    //   if (!passwordVerify(password, loginUser.password)) {
    //     next(createError(400, "worng password"));
    //   } else {
    //     //token
    //     const token = createToken({ id: loginUser._id }, "365d");

    //     res.status(200).cookie("authToken", token).json({
    //       message: "user login successfully",
    //       user: loginUser,
    //       token: token,
    //     });
    //   }
    // }
  } catch (error) {
    next(error);
  }
};

/**
 * @access public
 * @route /api/v1/user/me
 * @mehtod get
 */

export const loggedinUser = async (req, res, next) => {
  try {
    const auth_token = req.headers.authorization;

    if (!auth_token) {
      return next(createError(400, "token not found"));
    }

    if (auth_token) {
      const token = auth_token.split(" ")[1];
      const user = tokenVerify(token);

      if (user) {
        const loggedinUser = await User.findById(user.id);

        if (!loggedinUser) {
          return next(createError(400, "user data not match"));
        } else {
          res.status(200).json({
            message: "user data Stavle",
            user: loggedinUser,
          });
        }
      }
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Account acctivateAccount email
 */
export const acctivateAccount = async (req, res, next) => {
  try {
    //get token
    const { token } = req.params;

    //check token
    if (!token) {
      next(createError(400, "token invalid, try agin"));
    } else {
      //token verify
      const tokenData = tokenVerify(token);

      //check token
      if (!tokenData) {
        next(createError(400, " invalid token"));
      }

      //now acctivate account
      if (tokenData) {
        const account = await User.findById(tokenData.id);

        if (account.isActivate == true) {
          next(createError(400, "Account already Activate"));
        } else {
          await User.findByIdAndUpdate(tokenData.id, {
            isActivate: true,
            access_token: "",
          });

          res.status(200).json({
            message: "account activation is Successfully",
          });
        }
      }
    }
  } catch (error) {
    next(error);
  }
};

/**
 * account activation  code
 */

export const acctivateAccountBycode = async (req, res, next) => {
  try {
    const { code, email } = req.body;

    const user = await User.findOne().or([{ email: email }, { mobile: email }]);

    if (!user) {
      next(createError(404, "User activation not found"));
    } else {
      if (user.isActivate == true) {
        next(createError(404, "User account already activate", "warn"));
      } else {
        if (user.access_token != code) {
          next(createError(404, "Otp code not match", "warn"));
        } else {
          await User.findByIdAndUpdate(user._id, {
            isActivate: true,
            access_token: "",
          });

          res.status(200).json({
            message: "use activation successfully",
          });
        }
      }
    }
  } catch (error) {
    nest(error.message);
  }
};

/**
 * forgot password
 */

export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) {
      next(createError(404, "user not found"));
    }

    if (user) {
      //forgotpassword reset token
      const password_resetTOken = createToken({ id: user._id }, "30m");

      //create access token
      let activationCode = getRandom(10000, 99999);

      //check activation code
      const checkCode = await User.findOne({ access_token: activationCode });

      if (checkCode) {
        activationCode = getRandom(10000, 99999);
      }

      //forgot password activation link
      forgotPasswordLink(user.email, {
        name: user.first_name + " " + user.sur_name,
        link: `${process.env.APP_URL}:${process.env.SERVER_PORT}/api/v1/user/forgot-password/${password_resetTOken}`,
        code: activationCode,
      });

      await User.findByIdAndUpdate(user._id, {
        access_token: activationCode,
      });

      res.status(200).json({
        message: "password reset link has sent to your email",
      });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Account FORGOT PASSWORD ACTION
 */
export const forgotPasswordAction = async (req, res, next) => {
  try {
    //get token
    const { token } = req.params;
    const { password } = req.body;

    //check token
    if (!token) {
      next(createError(400, "invalid password reset link"));
    } else {
      //token verify
      const tokenData = tokenVerify(token);

      //check token
      if (!tokenData) {
        next(createError(400, " invalid token"));
      }

      //now acctivate account
      if (tokenData) {
        const user = await User.findById(tokenData.id);

        if (!user) {
          next(createError(400, "invalid user id"));
        }

        if (user) {
          await User.findByIdAndUpdate(user._id, {
            password: hashPassword(password),
            access_token: "",
          });

          res.status(200).json({
            message: "password change",
          });
        }
      }
    }
  } catch (error) {
    next(error);
  }
};

/**
 * FORGOT PASSWORD activation  code
 */

export const ForgotacctivateAccountBycode = async (req, res, next) => {
  try {
    const { code } = req.body;
    const { password } = req.body;

    const user = await User.findOne().and([
      { access_token: code },
      { isActivate: false },
    ]);

    if (!user) {
      next(createError(400, "ativation use not found"));
    }

    if (user) {
      await User.findByIdAndUpdate(user._id, {
        isActivate: true,
        password: hashPassword(password),
        access_token: "",
      });

      res.status(200).json({
        message: "reset password use activation code successfully",
      });
    }
  } catch (error) {
    nest(error);
  }
};

/**
 * Find use accoutn for password reset
 */

export const findUserAccoutnd = async (req, res, next) => {
  try {
    const { auth } = req.body;

    //initial auth value
    let mobileData = null;
    let emailData = null;

    if (isEmail(auth)) {
      emailData = auth;
      const emailCheck = await User.findOne({ email: auth });
      if (!emailCheck) {
        return next(createError(400, "Email User Not Found"));
      } else {
        res
          .status(200)
          .cookie(
            "findUser",
            JSON.stringify({
              name: emailCheck.first_name + " " + emailCheck.sur_name,
              photo: emailCheck.profile_photo,
              email: emailCheck.email,
            }),
            {
              expires: new Date(Date.now() + 1000 * 60 * 15),
            }
          )
          .json({
            user: emailCheck,
          });
      }
    } else if (isMobile(auth)) {
      mobileData = auth;
      const mobileCheck = await User.findOne({ mobile: auth });

      if (!mobileCheck) {
        return next(createError(400, "Mobile User Not Found"));
      } else {
        res
          .status(200)
          .cookie(
            "findUser",
            JSON.stringify({
              name: mobileCheck.first_name + " " + mobileCheck.sur_name,
              photo: mobileCheck.profile_photo,
              mobile: mobileCheck.mobile,
            }),
            {
              expires: new Date(Date.now() + 1000 * 60 * 15),
            }
          )
          .json({
            user: mobileCheck,
          });
      }
    } else {
      return next(createError(400, "Invalid Mobile Or Email"));
    }
  } catch (error) {
    next(error);
  }
};

/**
 *
 * @param {send password otp link} req
 * @param {*} res
 * @param {*} next
 * @returns
 */

export const sendPasswordotpLink = async (req, res, next) => {
  const { auth } = req.body;

  try {
    //initial auth value
    let emailData = null;
    let mobileData = null;
    let emailCheck;
    let mobileCheck;

    if (isEmail(auth)) {
      emailData = auth;

      emailCheck = await User.findOne({ email: auth });
    } else if (isMobile(auth)) {
      mobileData = auth;

      mobileCheck = await User.findOne({ mobile: auth });
    } else {
      return next(createError(400, "invalid mobile or email"));
    }

    //create access token
    let activationCode = getRandom(10000, 99999);

    //check activation code
    const checkCode = await User.findOne({ access_token: activationCode });

    if (checkCode) {
      activationCode = getRandom(10000, 99999);
    }

    //send mobile data
    if (mobileData) {
      //send otp
      SenOTP(
        mobileCheck.mobile,
        `HI ${mobileCheck.first_name} ${mobileCheck.sur_name}, your activation code is${activationCode}`
      );

      //update naw link
      await User.findByIdAndUpdate(mobileCheck._id, {
        access_token: activationCode,
      });

      res
        .status(200)
        .cookie("otp", mobileCheck.mobile, {
          expires: new Date(Date.now() + 1000 * 60 * 15),
        })
        .json({
          message: "Resend Otp Send Successfully",
        });
    }

    if (emailData) {
      //create activation token
      const activationToken = createToken({ id: emailCheck._id }, "30d");

      //create activation mail
      SendEmail(emailCheck.email, {
        name: emailCheck.first_name + " " + emailCheck.sur_name,
        link: `${process.env.APP_URL}:${process.env.SERVER_PORT}/api/v1/user/activate/${activationToken}`,

        code: activationCode,
      });

      //update naw link
      await User.findByIdAndUpdate(emailCheck._id, {
        access_token: activationCode,
      });

      res
        .status(200)
        .cookie("otp", emailCheck.email, {
          expires: new Date(Date.now() + 1000 * 60 * 15),
        })
        .json({
          message: "Activation link Send",
        });
    }
  } catch (error) {
    next(error.message);
  }
};

/**
 * check Password Reset Otp check
 */

export const checkPasswordResetOtp = async (req, res, next) => {
  try {
    const { code, auth } = req.body;

    if (isEmail(auth)) {
      const userData = await User.findOne().where("email").equals(auth);

      if (!userData) {
        return next(createError(400, "Invalid user Request"));
      }

      if (userData) {
        if (userData.access_token != code) {
          return next(createError(400, "Pssword not match"));
        }

        if (userData.access_token == code) {
          console.log();
          return res
            .cookie("cpid", userData._id.toString(), {
              expires: new Date(Date.now() + 1000 * 60 * 30),
            })
            .cookie("cpcode", code, {
              expires: new Date(Date.now() + 1000 * 60 * 30),
            })
            .status(200)
            .json({
              message: "you can Change your password",
            });
        }
      }
    } else if (isMobile(auth)) {
      const userData = await User.findOne().where("mobile").equals(auth);

      if (!userData) {
        return next(createError(400, "Invalid User Request"));
      }

      if (userData) {
        if (userData.access_token != code) {
          return next(createError(400, "password not match"));
        }

        if (userData.access_token == code) {
          return res
            .cookie("cpid", userData._id.toString(), {
              expires: new Date(Date.now() + 1000 * 60 * 30),
            })
            .cookie("cpcode", code, {
              expires: new Date(Date.now() + 1000 * 60 * 30),
            })
            .status(200)
            .json({
              message: "you can Change your password",
            });
        }
      }
    } else {
      return next(createError(400, "invalid Mobile or Email"));
    }
  } catch (error) {
    next(error);
  }
};

/**
 * password reset
 */

export const passwordReset = async (req, res, next) => {
  try {
    const { id, password, code } = req.body;
    const userData = await User.findOne().and([
      { _id: id },
      { access_token: code },
    ]);

    if (!userData) {
      return next(createError(400, "password change Req Faild"));
    }

    if (userData) {
      await User.findByIdAndUpdate(id, {
        password: hashPassword(password),
        access_token: null,
      });
      return res
        .clearCookie("cpcode")
        .clearCookie("cpid")
        .clearCookie("otp")
        .clearCookie("findUser")
        .status(200)
        .json({
          message: "password change SuccessFully",
        });
    }
  } catch (error) {
    // next(error.message);
    console.log(error.message);
  }
};

/**
 * profile update
 */

export const userProfileUpdate = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const user = await User.findByIdAndUpdate(id, data);

    if (user) {
      res.status(200).json({
        message: "profile update successfully",
      });

      if (!user) {
        return next(createError(400, "profile update faild"));
      }
    }
  } catch (error) {
    return next(error);
  }
};
