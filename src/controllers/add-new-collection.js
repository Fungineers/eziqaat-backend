import db from "@/database";
import { composeCollectionSMS, sendSMS } from "@/sms";
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
  const donor = req.donor;
  if (!donor) {
    return res.status(404).json({ message: "Donor not found" });
  }
  const {
    id: workerId,
    area: { id: areaId, areaName, chairpersonPhone },
    firstName,
    lastName,
  } = req.user;

  const { address, amount, donorId } = req.body;

  db.addNewCollection({ donorId, areaId, workerId, address, amount })
    .then((results) => {
      const { donationId } = results[0][0][0];
      if (!donationId) {
        res.status(403).json({ message: "Couldn't add record" });
      } else {
        sendSMS({
          phone: donor.phone,
          message: composeCollectionSMS({
            id: donationId,
            amount,
            address,
            workerName: `${firstName} ${lastName}`,
            areaName,
            workerId,
            chairpersonPhone,
          }),
        });
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
