const { regexps } = require("../constants");
const db = require("../database");
const { body } = require("express-validator");

module.exports.createAreaValidators = [
  body("areaName")
    .trim()
    .notEmpty()
    .withMessage("Area name is required")
    .matches(regexps.areaName)
    .withMessage("Invalid area name"),
];

module.exports.createArea = (req, res) => {
  const { areaName } = req.body;

  db.createArea({ areaName })
    .then((result) => {
      try {
        const area = result[0][0][0];
        res.status(201).json({
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
