const db = require("../database");
const { body } = require("express-validator");

module.exports.donorDonationRequestValidator = [
  body("amount")
    .trim()
    .notEmpty()
    .withMessage("Amount is required")
    .isNumeric()
    .withMessage("Amount must be a number")
    .toFloat(),
  body("address").trim().notEmpty().withMessage("Address is required"),
  body("areaId").trim().notEmpty().withMessage("Area is required"),
];

module.exports.donorDonationRequest = (req, res) => {
  const { id: donorId } = req.user;
  const { areaId, amount, address } = req.body;

  db.donorDonationRequest({ donorId, areaId, amount, address })
    .then((result) => {
      const { affectedRows } = result[0];
      if (affectedRows === 0) {
        res.status(403).json({ message: "Area not found" });
      } else {
        res.status(201).json({ message: "Request made successfully" });
      }
    })
    .catch((err) => {
      res.status(400).json({ message: err.sqlMessage });
    });
};
