import { roles } from "@/constants";
import db from "@/database";

const { verifyToken } = require("@/jwt");

const platformRoles = {
  WEB: [roles.GENERAL_SECRETARY, roles.OFFICE_SECRETARY],
  MOBILE: [roles.CHAIRPERSON, roles.WORKER, roles.DONOR],
};

const authenticateUser = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const [, accessToken] = authorization.split(" ");
    if (accessToken) {
      try {
        const { id, role, platform } = verifyToken(accessToken);
        if (platformRoles[platform].includes(role)) {
          db.getUserById({ id }).then((result) => {
            const user = result[0][0];
            if (user) {
              req.user = user;
            }
            next();
          });
        } else {
          next();
        }
      } catch (error) {
        console.log(error);
        next();
      }
    } else {
      next();
    }
  } else {
    next();
  }
};

export default authenticateUser;
