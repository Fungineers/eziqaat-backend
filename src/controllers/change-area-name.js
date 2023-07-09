import { regexps } from "@/constants";
import db from "@/database";
import { body } from "express-validator";

export const changeAreaNameValidators = [
  body("areaName")
    .trim()
    .notEmpty()
    .withMessage("Area name is required")
    .matches(regexps.areaName)
    .withMessage("Invalid area name"),
];

const changeAreaName = (req, res) => {
  const { id } = req.params;
  const { areaName } = req.body;

  db.changeAreaName({ id, areaName })
    .then((result) => {
      const { affectedRows } = result[0];
      if (affectedRows === 0) {
        res.status(403).json({
          message:
            "Couldn't set area name. It either doesn't exist or you didn't provide a different new name",
        });
      } else {
        res.status(200).json({ message: "Area name changed successfully" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({
        message: error.sqlMessage,
      });
    });
};

export default changeAreaName;
