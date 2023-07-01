import { regexps, roles } from "@/constants";
import createUser, { authorizeCreateUser } from "@/controllers/create-user";
import validateBody from "@/middleware/validate-body";
import { Router } from "express";
import { body } from "express-validator";

const userRouter = Router();

userRouter.post(
  "/",

  body("firstName").trim().notEmpty().withMessage("First name is required"),

  body("lastName").trim().notEmpty().withMessage("Last name is required"),

  body("email")
    .trim()
    .optional()
    .isEmail()
    .withMessage("Incorrect email format")
    .normalizeEmail(),

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
    .withMessage("Incorrect phone format"),

  body("cnic")
    .trim()
    .notEmpty()
    .withMessage("Phone is required")
    .matches(regexps.cnic)
    .withMessage("Invalid CNIC"),

  validateBody,

  authorizeCreateUser,

  createUser
);

export default userRouter;
