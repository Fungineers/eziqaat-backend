import { Router } from "express";
import { connection, queries } from "@/database";
import { sign } from "jsonwebtoken";
import { regexps } from "@/constants";
import { getCredentialField } from "@/utils";

const router = Router();

/**
 * Signin providing credential (email/cnic/phone) and password
 */
router.post("/signin", (req, res) => {
  const { credential, password } = req.body;
  const field = getCredentialField(credential);
  if (!field) {
    return res.status(400).json({
      message: "Invalid credential",
    });
  }
  const { query, params } = queries.authenticateUser({
    credential,
    password,
    field,
  });
  connection.query(query, params, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(401).json({ message: "Couldn't sign in", error });
    }
    const user = results[0];
    if (!user) {
      return res.status(401).json({
        error: "Couldn't sign in",
        message: "Incorrect set of credentials",
      });
    }
    const token = sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return res.status(201).json({ token, user });
  });
});

export default router;
