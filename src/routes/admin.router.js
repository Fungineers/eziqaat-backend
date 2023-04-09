const { Router } = require("express");
const { connection } = require("../db");
const { roles } = require("../constants");
const { generateRandomString } = require("../utils");

const router = Router();

router.all("*", (req, res, next) => {
  // TODO: validation here

  return next();
});

router.post("/create-worker", (req, res) => {
  const { firstName, lastName, email, cnic, phone } = req.body;

  const password = generateRandomString(8);
  const role = roles.WORKER;
  const active = false;

  const query = `CALL add_user(?, ?, ?, ?, ?, ?, ?)`;
  const params = [firstName, lastName, email, cnic, password, role, active];

  connection.query(query, params, (error, results, fields) => {
    if (error) {
      console.log(error);
      res
        .status(400)
        .json({ error: "Couldn't create worker", message: error.sqlMessage });
    }
    const user = results[0][0];
    return res.status(200).json({ user });
  });

  return res.json({
    message: "hello",
  });
});

module.exports = router;
