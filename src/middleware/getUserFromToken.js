import { verify } from "jsonwebtoken";
import { connection, queries } from "@/database";
import { roles } from "@/constants";
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
    try {
      const payload = verify(token, process.env.JWT_SECRET);
      const { id, platform } = payload;
      const allowedRoles = [];
      switch (platform) {
        case "MOBILE":
          allowedRoles.push(roles.DONOR, roles.WORKER, roles.CHAIRPERSON);
          break;
        case "WEB":
          allowedRoles.push(roles.OFFICE_SECRETARY, roles.GENERAL_SECRETARY);
          break;
        default:
          return res.status(400).json({
            message: "Missing platform",
          });
      }
      const { sql, params } = queries.getUserById({ id, allowedRoles });
      connection.query(sql, params, (error, results) => {
        if (error) {
          console.log(error);
          next();
        } else {
          user = results[0];
          req.user = user;
          next();
        }
      });
    } catch (error) {
      console.log(error);
      next();
    }
  } else {
    next();
  }
};

export default getUserFromToken;
