import login from "@/controllers/login";
import db from "@/database";
import validateBody from "@/middleware/validate-body";
import { Router } from "express";
import { body } from "express-validator";

const authRouter = Router();

authRouter.post(
  "/login",

  body("credential").trim().notEmpty().withMessage("Credential is required"),

  body("password").trim().notEmpty().withMessage("Password is required"),

  body("platform")
    .trim()
    .notEmpty()
    .withMessage("Platform is required")
    .isIn(["MOBILE", "WEB"])
    .withMessage("Invalid platform"),

  validateBody,

  login
);

authRouter.get("/me", (req, res) => {
  const { user } = req;
  if (user) {
    res.status(201).json({
      message: "Retrieved the logged in user",
      user,
    });
  } else {
    res.status(401).json({
      message: "Session has expired",
    });
  }
});

export default authRouter;
