const { regexps } = require("../constants");
const db = require("../database");
const { body } = require("express-validator");

module.exports.changePhoneValidators = [
  body("phone")
    .trim()
    .notEmpty()
    .withMessage("New phone is required")
    .matches(regexps.phone)
    .withMessage("Invalid phone"),
];

module.exports.changePhone = (req, res) => {
  const { id } = req.user;
  const { phone } = req.body;

  db.changePhone({ id, phone }).then((results) => {
    const { affectedRows } = results[0];
    if (affectedRows === 0) {
      return res.status(400).json({
        message: "Please choose a different new phone",
      });
    }
    res.status(200).json({ message: "Phone changed" });
  });
};
