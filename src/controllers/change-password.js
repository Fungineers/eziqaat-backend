const { regexps } = require("../constants");
const db = require("../database");
const { body } = require("express-validator");

module.exports.changePasswordValidators = [
  body("currentPassword")
    .trim()
    .notEmpty()
    .withMessage("Current password is required"),

  body("newPassword")
    .trim()
    .notEmpty()
    .withMessage("New password is required")
    .isLength({ min: 8, max: 20 })
    .withMessage("Password must be 8-20 characters long")
    .matches(regexps.password)
    .withMessage("Weak password"),
];

module.exports.changePassword = (req, res) => {
  const { id } = req.user;
  const { currentPassword, newPassword } = req.body;

  if (currentPassword === newPassword) {
    return res
      .status(403)
      .json({ message: "Please choose a different new password" });
  }

  db.changePassword({ id, currentPassword, newPassword })
    .then((results) => {
      const { affectedRows } = results[0];

      if (affectedRows === 0) {
        return res.status(403).json({
          message:
            "Current password is incorrect. Maybe you typed an old password",
        });
      }
      res.status(200).json({ message: "Password changed" });
    })
    .catch((error) => {
      res.status(400).json({ message: error.sqlMessage });
    });
};
