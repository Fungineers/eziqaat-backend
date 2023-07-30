const db = require("../database");
const { composeResetPasswordSMS, sendSMS } = require("../sms");
const { generateRandomPassword } = require("../utils");
const { body } = require("express-validator");

module.exports.resetPasswordValidators = [
  body("credential").trim().notEmpty().withMessage("Credential is required"),
];

module.exports.resetPassword = (req, res) => {
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
