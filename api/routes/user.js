import express from "express";
import {
  loggedinUser,
  login,
  register,
  acctivateAccount,
  acctivateAccountBycode,
  forgotPassword,
  forgotPasswordAction,
  ForgotacctivateAccountBycode,
  resendActivation,
  findUserAccoutnd,
  sendPasswordotpLink,
  checkPasswordResetOtp,
  passwordReset,
} from "../controllers/userControler.js";

//init router
const router = express.Router();
//
//user auth route
router.post("/register", register);
router.post("/login", login);
router.get("/me", loggedinUser);
router.get("/activate/:token", acctivateAccount);
router.post("/code-activation", acctivateAccountBycode);
router.post("/resend-Link", resendActivation);
router.post("/forgot-password", forgotPassword);
router.post("/forgot-password/:token", forgotPasswordAction);
router.post("/Forgotcode-activation", ForgotacctivateAccountBycode);
router.post("/find-user-account", findUserAccoutnd);
router.post("/resend-password-otp", sendPasswordotpLink);
router.post("/check-password-otp", checkPasswordResetOtp);
router.post("/Password-reset", passwordReset);

//export default
export default router;
