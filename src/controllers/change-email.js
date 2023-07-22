import db from "@/database";
import generateRandomOTP from "@/utils/generate-random-otp";
import { body } from "express-validator";

export const changeEmailValidators = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("New email is required")
    .isEmail()
    .withMessage("Invalid email"),
];

const changeEmail = (req, res) => {
  const { id } = req.user;
  const { email } = req.body;

  const emailOtp = generateRandomOTP();

  db.changeEmail({ id, email, emailOtp })
    .then((results) => {
      const { affectedRows } = results[0];
      if (affectedRows === 0) {
        return res.status(400).json({
          message: "Please choose a different new email",
        });
      }
      res.status(200).json({ message: "Email changed" });
    })
    .catch((err) => {
      res.status(400).json({ message: err.sqlMessage });
    });
};

export default changeEmail;
