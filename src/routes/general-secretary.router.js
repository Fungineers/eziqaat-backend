import { Router } from "express";
import { connection, queries } from "@/database";
import { roles } from "@/constants";
import { generateRandomString } from "@/utils";
import { verifyRole } from "@/middleware";

const router = Router();

router.all("*", verifyRole(roles.GENERAL_SECRETARY));

router.post("/area", (req, res) => {
  const { name } = req.body;
  const { query, params } = queries.createArea({ name });

  connection.query(query, params, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(400).json({
        error: "Couldn't create area",
        message: error.sqlMessage,
      });
    }
    const area = results[0][0];
    return res.status(200).json({ area });
  });
});

router.post("/chairperson", (req, res) => {
  const { firstName, lastName, email, cnic, phone } = req.body;

  const password = generateRandomString(8);
  const role = roles.CHAIRPERSON;

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
        .json({ error: "Couldn't create worker", message: error.sqlMessage });
    }
    const user = results[0][0];
    return res.status(200).json({ user });
  });
});

export default router;
