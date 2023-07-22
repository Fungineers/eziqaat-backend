import { regexps } from "@/constants";
import db from "@/database";
import { body } from "express-validator";

export const changePhoneValidators = [
  body("phone")
    .trim()
    .notEmpty()
    .withMessage("New phone is required")
    .matches(regexps.phone)
    .withMessage("Invalid phone"),
];

const changePhone = (req, res) => {
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

export default changePhone;
