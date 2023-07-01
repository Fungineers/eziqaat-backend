import changeEmail, { changeEmailValidators } from "@/controllers/change-email";
import changePassword, {
  changePasswordValidators,
} from "@/controllers/change-password";
import changePhone, { changePhoneValidators } from "@/controllers/change-phone";
import createUser, {
  authorizeCreateUser,
  createUserValidators,
} from "@/controllers/create-user";
import removeEmail from "@/controllers/remove-email";
import resetPassword, {
  resetPasswordValidators,
} from "@/controllers/reset-password";
import verifyEmail, {
  authorizeVerifyEmail,
  verifyEmailValidators,
} from "@/controllers/verify-email";
import validateBody from "@/middleware/validate-body";
import verifyLogin from "@/middleware/verify-login";
import { Router } from "express";

const userRouter = Router();

userRouter.post(
  "/",
  ...createUserValidators,
  validateBody,
  authorizeCreateUser,
  createUser
);

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
  resetPassword
);

userRouter.put(
  "/email",
  verifyLogin,
  ...changeEmailValidators,
  validateBody,
  changeEmail
);

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

export default userRouter;
