import db from "@/database";
import { regexps } from "@/constants";
import { body } from "express-validator";

export const verifyEmailValidators = [
  body("emailOtp")
    .trim()
    .notEmpty()
    .withMessage("Email OTP is required")
    .matches(regexps.emailOtp)
    .withMessage("OTP must be 4 digits"),
];

export const authorizeVerifyEmail = (req, res, next) => {
  if (req.user.emailVerified) {
    return res.status(403).json({ message: "Email already verified" });
  }
  next();
};

const verifyEmail = (req, res) => {
  const { id } = req.user;
  const { emailOtp } = req.body;

  db.verifyEmail({ id, emailOtp })
    .then((results) => {
      const { affectedRows } = results[0];
      if (affectedRows === 0) {
        return res.status(403).json({
          message: "Incorrect OTP",
        });
      }
      res.status(200).json({ message: "Email verified" });
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({ message: error.sqlMessage });
    });
};

export default verifyEmail;
