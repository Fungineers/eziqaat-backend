import { regexps } from "@/constants";
import db from "@/database";
import { body } from "express-validator";

export const createAreaValidators = [
  body("areaName")
    .trim()
    .notEmpty()
    .withMessage("Area name is required")
    .matches(regexps.areaName)
    .withMessage("Invalid area name"),
];

const createArea = (req, res) => {
  const { areaName } = req.body;

  db.createArea({ areaName })
    .then((result) => {
      try {
        const area = result[0][0][0];
        res.status(200).json({
          message: "Area created successfully",
          area,
        });
      } catch (err) {
        console.log(err);
        res.status(400).json({
          message: "Something went wrong",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({
        message: error.sqlMessage,
      });
    });
};

export default createArea;
