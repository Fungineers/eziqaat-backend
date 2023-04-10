import { Router } from "express";
import { connection } from "../db";
import { roles } from "../constants";
import { generateRandomString } from "../utils";
import { verifyRole } from "../middleware";

const router = Router();

router.all("*", verifyRole(roles.CHAIRPERSON));

router.post("/create-worker", (req, res) => {
  const { firstName, lastName, email, cnic, phone } = req.body;

  const password = generateRandomString(8);
  console.log(password);
  const role = roles.WORKER;
  const active = false;

  const query = `CALL add_user(?, ?, ?, ?, ?, ?, ?)`;
  const params = [firstName, lastName, email, cnic, password, role, active];

  connection.query(query, params, (error, results) => {
    if (error) {
      console.log(error);
      return res
        .status(400)
        .json({ error: "Couldn't create worker", message: error.sqlMessage });
    }
    const user = results[0][0];
    return res.status(200).json({ user });
  });
});

export default router;
