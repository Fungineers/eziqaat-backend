import db from "@/database";
import { composeResetPasswordSMS, sendSMS } from "@/sms";
import generateRandomPassword from "@/utils/generate-random-password";
import { body } from "express-validator";

export const resetPasswordValidators = [
  body("credential").trim().notEmpty().withMessage("Credential is required"),
];

const resetPassword = (req, res) => {
  if (!req.user) {
    return res.status(404).json({
      message: "User not found",
    });
  }
  const { phone } = req.user;
  const { credential } = req.body;
  const password = generateRandomPassword();
  console.log(password);

  db.resetPassword({ credential, password })
    .then((results) => {
      const { affectedRows } = results[0];
      if (affectedRows === 0) {
        return res.status(404).json({
          message: "User not found",
        });
      }
      sendSMS({ phone, message: composeResetPasswordSMS({ password }) });
      res.status(200).json({ message: "Password reset successfully" });
    })
    .catch((error) => {
      res.status(400).json({ message: error.sqlMessage });
    });
};

export default resetPassword;
