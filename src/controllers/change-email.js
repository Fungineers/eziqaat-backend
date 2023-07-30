const db = require("../database");
const { sendResetEmail } = require("../email");
const { generateRandomOTP } = require("../utils");
const { body } = require("express-validator");
const moment = require("moment");

module.exports.changeEmailValidators = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("New email is required")
    .isEmail()
    .withMessage("Invalid email"),
];

module.exports.changeEmail = (req, res) => {
  const { id, firstName } = req.user;
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
      sendResetEmail({
        to: email,
        context: {
          email,
          name: firstName,
          time: moment(new Date()).format("LLL"),
          otp: emailOtp,
        },
      });
      res.status(200).json({ message: "Email changed" });
    })
    .catch((err) => {
      res.status(400).json({ message: err.sqlMessage });
    });
};
