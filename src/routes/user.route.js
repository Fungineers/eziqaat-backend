const { Router } = require("express");
const {
  createUserValidators,
  authorizeCreateUser,
  createUser,
} = require("../controllers/create-user");
const {
  validateBody,
  verifyLogin,
  getUserFromCredential,
} = require("../middleware");
const {
  changePasswordValidators,
  changePassword,
} = require("../controllers/change-password");
const {
  resetPasswordValidators,
  resetPassword,
} = require("../controllers/reset-password");
const {
  changeEmailValidators,
  changeEmail,
} = require("../controllers/change-email");
const { getEmailOtp } = require("../controllers/get-email-otp");
const { removeEmail } = require("../controllers/remove-email");
const {
  authorizeVerifyEmail,
  verifyEmailValidators,
  verifyEmail,
} = require("../controllers/verify-email");
const {
  changePhoneValidators,
  changePhone,
} = require("../controllers/change-phone");
const { getChairpersons } = require("../controllers/get-chairpersons");
const { getAdminStats } = require("../controllers/get-admin-stats");
const {
  getOfficeSecretaries,
} = require("../controllers/get-office-secretaries");

const userRouter = Router();

userRouter.post(
  "/",
  ...createUserValidators,
  validateBody,
  authorizeCreateUser,
  createUser
);

userRouter.get("/admin-stats", getAdminStats);

userRouter.get("/chairperson", getChairpersons);

userRouter.get("/office-secretary", getOfficeSecretaries);

userRouter.put(
  "/password",
  verifyLogin,
  ...changePasswordValidators,
  validateBody,
  changePassword
);

userRouter.put(
  "/password/reset",
  ...resetPasswordValidators,
  validateBody,
  (req, res, next) => {
    const { credential } = req.body;
    getUserFromCredential(credential, "user")(req, res, next);
  },
  resetPassword
);

userRouter.put(
  "/email",
  verifyLogin,
  ...changeEmailValidators,
  validateBody,
  changeEmail
);

userRouter.get("/email/otp", verifyLogin, getEmailOtp);

userRouter.delete("/email", verifyLogin, removeEmail);

userRouter.post(
  "/email/verify",
  verifyLogin,
  authorizeVerifyEmail,
  ...verifyEmailValidators,
  validateBody,
  verifyEmail
);

userRouter.put(
  "/phone",
  verifyLogin,
  ...changePhoneValidators,
  validateBody,
  changePhone
);

module.exports = userRouter;
