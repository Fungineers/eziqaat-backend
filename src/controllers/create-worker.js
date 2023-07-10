import { regexps } from "@/constants";
import db from "@/database";
import generateRandomOTP from "@/utils/generate-random-otp";
import generateRandomPassword from "@/utils/generate-random-password";
import { body } from "express-validator";

export const createWorkerValidators = [
  body("firstName").trim().notEmpty().withMessage("First name is required"),

  body("lastName").trim().notEmpty().withMessage("Last name is required"),

  body("email").trim().optional().isEmail().withMessage("Invalid email"),

  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Phone is required")
    .matches(regexps.phone)
    .withMessage("Invalid phone"),

  body("cnic")
    .trim()
    .notEmpty()
    .withMessage("Phone is required")
    .matches(regexps.cnic)
    .withMessage("Invalid CNIC"),
];

const createWorker = (req, res) => {
  const { id: chairpersonId } = req.user;
  const { firstName, lastName, email, phone, cnic } = req.body;

  const password = generateRandomPassword();
  const emailOTP = generateRandomOTP();

  console.log(password);

  db.createWorker({
    chairpersonId,
    firstName,
    lastName,
    email,
    phone,
    cnic,
    password,
    emailOTP,
  })
    .then((result) => {
      try {
        const worker = result[0][0][0];
        res.status(201).json({
          message: "Worker created sucessfully",
          worker,
        });
      } catch (error) {
        console.log(error);
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
export default createWorker;
