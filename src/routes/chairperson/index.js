import { Router } from "express";
import { connection, queries } from "@/database";
import { roles } from "@/constants";
import { generateRandomString } from "@/utils";
import { verifyRole } from "@/middleware";

const router = Router();

router.post("/", verifyRole([roles.GENERAL_SECRETARY]), (req, res) => {
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
        .json({ message: "Couldn't create chairperson", error });
    }
    const user = results[4][0];
    return res.status(200).json({ user });
  });
});

export default router;
