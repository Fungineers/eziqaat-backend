import { Router } from "express";
import { connection, queries } from "@/database";
import { roles } from "@/constants";
import { generateRandomString } from "@/utils";
import { validateSignup, verifyRole } from "@/middleware";

const router = Router();

router.post(
  "/",
  (req, res, next) => {
    const { role } = req.body;
    if (role === roles.CHAIRPERSON || role === roles.OFFICE_SECRETARY) {
      return verifyRole([roles.GENERAL_SECRETARY])(req, res, next);
    } else if (role === roles.WORKER) {
      return verifyRole([roles.CHAIRPERSON])(req, res, next);
    } else if (role === roles.DONOR) {
      if (req.user) {
        return verifyRole([roles.WORKER])(req, res, next);
      }
      next();
    } else {
      return res.status(400).json({ message: "Invalid role" });
    }
  },
  validateSignup,
  (req, res) => {
    const { firstName, lastName, email, cnic, phone, role } = req.body;

    const password = generateRandomString(8);

    console.log(password);

    const { query, params } = queries.createUser({
      firstName,
      lastName,
      email,
      role,
      phone,
      cnic,
      password,
    });

    connection.query(query, params, (error, results) => {
      if (error) {
        console.log(error);
        return res
          .status(400)
          .json({ message: "Couldn't create chairperson", error });
      }

      const user = results[3][0];
      return res.status(200).json({ user });
    });
  }
);

export default router;
