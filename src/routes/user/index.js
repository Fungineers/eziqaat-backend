import { Router } from "express";
import { connection, queries } from "@/database";
import { regexps, roles } from "@/constants";
import { generateRandomString, getCredentialField } from "@/utils";
import { validateSignup, verifyRole } from "@/middleware";

const router = Router();

/**
 * Create any user except worker and general secretary
 */
router.post(
  "/",
  (req, res, next) => {
    const { role } = req.body;
    if (role === roles.CHAIRPERSON || role === roles.OFFICE_SECRETARY) {
      return verifyRole([roles.GENERAL_SECRETARY])(req, res, next);
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

    const { sql, params } = queries.createUser({
      firstName,
      lastName,
      email,
      role,
      phone,
      cnic,
      password,
    });

    connection.query(sql, params, (error, results) => {
      if (error) {
        console.log(error);
        return res.status(400).json({ message: "Couldn't create user", error });
      }

      const user = results[3][0];
      return res.status(200).json({ user });
    });
  }
);

/**
 * Change Email
 */
router.put("/email", (req, res) => {
  if (!req.user) {
    return res.status(401).json({
      error: "Couldn't process request",
      message: "Access Denied",
    });
  }
  const { id: userId } = req.user;
  const { email } = req.body;
  const isValid = regexps.email.test(email);
  if (!isValid) {
    return res.status(400).json({
      error: "Couldn't process request",
      message: "Incorrect email format",
    });
  }
  const { sql, params } = queries.changeEmail({ userId, email });
  connection.query(sql, params, (error, result) => {
    if (error) {
      return res.status(400).json({
        message: "Email is not unique",
        error,
      });
    }
    const { changedRows, affectedRows } = result;
    if (affectedRows === 0) {
      return res.status(404).json({
        message: "No user record found",
        error,
      });
    }
    if (changedRows === 0) {
      return res.status(403).json({
        message: "Email can't be same as old email",
      });
    }
    return res.status(200).json({
      message: "Email changed successfully",
    });
  });
});

/**
 * Change Phone
 */
router.put("/phone", (req, res) => {
  if (!req.user) {
    return res.status(401).json({
      error: "Couldn't process request",
      message: "Access Denied",
    });
  }
  const { id: userId } = req.user;
  const { phone } = req.body;
  const isValid = regexps.phone.test(phone);
  if (!isValid) {
    return res.status(400).json({
      error: "Couldn't process request",
      message: "Incorrect phone format",
    });
  }
  const { sql, params } = queries.changePhone({ userId, phone });
  connection.query(sql, params, (error, result) => {
    if (error) {
      return res.status(400).json({
        message: "Phone is not unique",
        error,
      });
    }
    const { changedRows, affectedRows } = result;
    if (affectedRows === 0) {
      return res.status(404).json({
        message: "No user record found",
        error,
      });
    }
    if (changedRows === 0) {
      return res.status(403).json({
        message: "Phone can't be same as old phone",
      });
    }
    return res.status(200).json({
      message: "Phone changed successfully",
    });
  });
});

/**
 * Change password
 */
router.put("/password", (req, res) => {
  if (!req.user) {
    return res.status(401).json({
      error: "Couldn't process request",
      message: "Access Denied",
    });
  }
  const { id } = req.user;
  const { currentPassword, newPassword } = req.body;
  const isValid = regexps.password.test(newPassword);
  if (!isValid) {
    return res.status(400).json({
      error: "Please select a strong password",
      message:
        "Password must be 8-20 characters long, with at least one uppercase, one lowercase, one numeric, and one special character",
    });
  }
  const { sql, params } = queries.updatePassword({
    id,
    currentPassword,
    newPassword,
  });
  connection.query(sql, params, (error, result) => {
    if (error) {
      return res.status(400).json({
        message: "Password couldn't be changed.",
        error,
      });
    }
    const { changedRows, affectedRows } = result;
    if (affectedRows === 0) {
      return res.status(404).json({
        message: "Incorrect old password",
        error,
      });
    }
    if (changedRows === 0) {
      return res.status(403).json({
        message: "Password can't be same as old password",
      });
    }
    return res.status(200).json({
      message: "Password changed successfully",
    });
  });
});

/**
 * Reset password
 */
router.patch("/password", (req, res) => {
  const { credential } = req.body;
  const field = getCredentialField(credential);
  if (!field) {
    return res.status(400).json({
      message: "Invalid credential",
    });
  }
  const password = generateRandomString(8);
  const { sql, params } = queries.resetPassword({
    credential,
    password,
    field,
  });
  connection.query(sql, params, (error, result) => {
    if (error) {
      return res.status(400).json({
        message: "Password couldn't be reset",
        error,
      });
    }
    const { affectedRows } = result;
    if (affectedRows === 0) {
      return res.status(404).json({
        message: "No user record found",
        error,
      });
    }
    /**
     *
     * TODO: Handle SMS logic here
     *
     */
    return res.status(200).json({
      message: "Password changed successfully",
    });
  });
});

export default router;
