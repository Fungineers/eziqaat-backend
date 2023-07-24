import db from "@/database";
import { body } from "express-validator";

export const addNewCollectionValidator = [
  body("amount")
    .trim()
    .notEmpty()
    .withMessage("Amount is required")
    .isNumeric()
    .withMessage("Amount must be a number")
    .toFloat(),
  body("address").trim().notEmpty().withMessage("Address is required"),
];

const addNewCollection = (req, res) => {
  const {
    id: workerId,
    area: { id: areaId },
  } = req.user;

  const { address, amount, donorId } = req.body;

  db.addNewCollection({ donorId, areaId, workerId, address, amount })
    .then((results) => {
      const { affectedRows } = results[0];
      if (affectedRows === 0) {
        res.status(403).json({ message: "Couldn't add record" });
      } else {
        res
          .status(201)
          .json({ message: "Added collection record successfully" });
      }
    })
    .catch((err) => {
      res.status(400).json({ message: err.sqlMessage });
    });
};

export default addNewCollection;
