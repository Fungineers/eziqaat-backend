const { roles } = require("@/constants");
const { queries, connection } = require("@/database");
const { verifyRole } = require("@/middleware");
const { generateRandomString } = require("@/utils");
const { Router } = require("express");

const router = Router();

router.post("/", verifyRole(roles.CHAIRPERSON), (req, res) => {
  const { firstName, lastName, email, cnic, phone } = req.body;

  const password = generateRandomString(8);
  const role = roles.WORKER;

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
      return res.status(400).json({ message: "Couldn't create worker", error });
    }
    const user = results[4][0];
    return res.status(200).json({ user });
  });
});

export default router;