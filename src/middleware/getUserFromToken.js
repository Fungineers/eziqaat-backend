import { verify } from "jsonwebtoken";
import { connection } from "../db";
/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
const getUserFromToken = (req, res, next) => {
  let user = null;
  const authorization = req.headers.authorization;
  if (authorization) {
    const [, token] = authorization.split(" ");
    const payload = verify(token, process.env.JWT_SECRET);
    if (payload) {
      const { id } = payload;
      const query = `
        SELECT id, firstname, lastname, email, cnic, role, active 
        FROM user 
        WHERE id = ?
      `;
      const params = [id];
      connection.query(query, params, (error, results) => {
        if (error) {
          console.log(error);
          next();
        } else {
          user = results[0];
          req.user = user;
          next();
        }
      });
    } else {
      next();
    }
  } else {
    next();
  }
};

export default getUserFromToken;
