import { regexps, roles } from "@/constants";
import db from "@/database";
import { sendRegisterEmail } from "@/email";
import { composeAccountCreationSMS, sendSMS } from "@/sms";
import generateRandomOTP from "@/utils/generate-random-otp";
import generateRandomPassword from "@/utils/generate-random-password";
import { body } from "express-validator";
import moment from "moment";

export const authorizeCreateUser = (req, res, next) => {
  const { user } = req;
  const { role: userRole } = req.body;
  if (user) {
    const { role: creatorRole } = user;
    if (
      (creatorRole === roles.GENERAL_SECRETARY &&
        [roles.CHAIRPERSON, roles.OFFICE_SECRETARY].includes(userRole)) ||
      (creatorRole === roles.CHAIRPERSON && userRole === roles.WORKER)
    ) {
      next();
    } else if (userRole === roles.DONOR && creatorRole === roles.WORKER) {
      next();
    } else {
      return res.status(401).json({ message: "Access Denied" });
    }
  } else {
    if (userRole === roles.DONOR) {
      next();
    } else {
      return res.status(401).json({ message: "Access Denied" });
    }
  }
};

export const createUserValidators = [
  body("firstName").trim().notEmpty().withMessage("First name is required"),

  body("lastName").trim().notEmpty().withMessage("Last name is required"),

  body("email").trim().optional().isEmail().withMessage("Invalid email"),

  body("role")
    .trim()
    .notEmpty()
    .isIn(Object.values(roles))
    .withMessage("Invalid role"),

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

const createUser = (req, res) => {
  const { firstName, lastName, email, role, phone, cnic } = req.body;

  const password = generateRandomPassword();
  const emailOTP = generateRandomOTP();

  console.log(password);

  db.createUser({
    firstName,
    lastName,
    email,
    role,
    phone,
    cnic,
    password,
    emailOTP,
  })
    .then((result) => {
      try {
        const user = result[0][0][0];
        res.status(201).json({
          message: "User created sucessfully",
          user,
        });
        sendSMS({
          phone,
          message: composeAccountCreationSMS({ firstName, password, role }),
        });
        if (email) {
          sendRegisterEmail({
            to: email,
            context: {
              name: firstName,
              time: moment(new Date()).format("LLL"),
              otp: emailOTP,
              email,
            },
          });
        }
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

export default createUser;
