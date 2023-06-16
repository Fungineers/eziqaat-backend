import { connection, queries } from "@/database";
import { createNotification } from "@/firebase";
import { getCredentialField } from "@/utils";
import { Router } from "express";
import { sign } from "jsonwebtoken";

const router = Router();

/**
 * Signin providing credential (email/cnic/phone) and password
 */
router.get("/me", (req, res) => {
  if (req.user) {
    return res.status(201).json({ user: req.user });
  } else {
    return res
      .status(401)
      .json({ error: "Unauthorized", message: "You are not signed in" });
  }
});

router.post("/signin", (req, res) => {
  const { credential, password } = req.body;
  const field = getCredentialField(credential);
  if (!field) {
    return res.status(400).json({
      message: "Invalid credential",
    });
  }
  const { sql, params } = queries.authenticateUser({
    credential,
    password,
    field,
  });
  connection.query(sql, params, (error, results) => {
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
    createNotification({
      userId: user.id,
      body: "Signed in",
      type: "SIGN_IN",
      title: "Signed in",
    });
    return res.status(201).json({ token, user });
  });
});

export default router;
