import db from "@/database";
import { generateToken } from "@/jwt";
import { body } from "express-validator";

export const loginValidators = [
  body("credential").trim().notEmpty().withMessage("Credential is required"),

  body("password").trim().notEmpty().withMessage("Password is required"),

  body("platform")
    .trim()
    .notEmpty()
    .withMessage("Platform is required")
    .isIn(["MOBILE", "WEB"])
    .withMessage("Invalid platform"),
];

const login = (req, res) => {
  const { credential, password, platform } = req.body;

  db.verifyCredentials({ credential, password, platform })
    .then((result) => {
      try {
        const user = result[0][0][0];
        if (user) {
          const { role, id, active } = user;

          if (!active) {
            res.status(403).json({ message: "Account disabled" });
          } else {
            const accessToken = generateToken({ id, role, platform });

            res
              .status(201)
              .setHeader("Authorization", `Bearer ${accessToken}`)
              .json({
                message: "Logged in successfully",
                user,
              });
          }
        } else {
          res.status(401).json({
            message: "Incorrect set of credentials",
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

export default login;
