import { roles } from "@/constants";
import { connection, queries } from "@/database";
import { validateSignup, verifyRole } from "@/middleware";
import { generateRandomString } from "@/utils";
import { Router } from "express";

const router = Router();

/**
 * Create worker. Must be signed in as a chairperson
 */
router.post(
  "/",
  verifyRole([roles.CHAIRPERSON]),
  validateSignup,
  (req, res) => {
    const chairpersonId = req.user.id;
    const role = roles.WORKER;
    const { firstName, lastName, email, cnic, phone } = req.body;

    const password = generateRandomString(8);

    console.log(password);

    const { sql, params } = queries.createWorker({
      firstName,
      lastName,
      email,
      role,
      phone,
      cnic,
      password,
      chairpersonId,
    });

    connection.query(sql, params, (error, results) => {
      if (error) {
        console.log(error);
        connection.query("ROLLBACK");
        return res
          .status(400)
          .json({ message: "Couldn't create worker", error });
      }

      const user = results[8][0];
      return res.status(200).json({ user });
    });
  }
);

/**
 * Get workers from the area the current signed in chairperson is assigned to
 */
router.get("/", verifyRole([roles.CHAIRPERSON]), (req, res) => {
  const { id: chairpersonId } = req.user;
  const { sql, params } = queries.getWorkersByChairperson({ chairpersonId });
  connection.query(sql, params, (error, results) => {
    if (error) {
      return res.status(400).json({
        message: "Something went wrong",
        error,
      });
    }
    const workers = results[1];
    return res.status(200).json({ workers });
  });
});

export default router;
