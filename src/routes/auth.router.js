import { Router } from "express";
import { connection } from "../db";
import { sign } from "jsonwebtoken";

const router = Router();

router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  const query = `CALL authenticate(?, ?)`;
  const params = [email, password];
  connection.query(query, params, (error, results) => {
    if (error) {
      console.log(error);
      return res
        .status(401)
        .json({ error: "Couldn't sign in", message: error.sqlMessage });
    }
    console.log(results);
    const user = results[0][0];
    if (!user) {
      return res.status(401).json({
        error: "Couldn't sign in",
        message: "Incorrect email or password",
      });
    }
    const token = sign(
      { id: user.id, role: user.role, active: !!user.active },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    return res.status(201).json({ token, user });
  });
});

export default router;
