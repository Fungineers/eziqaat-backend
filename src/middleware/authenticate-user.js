import { roles } from "@/constants";
import db from "@/database";
import { verifyToken } from "@/jwt";

const platformRoles = {
  WEB: [roles.GENERAL_SECRETARY, roles.OFFICE_SECRETARY],
  MOBILE: [roles.CHAIRPERSON, roles.WORKER, roles.DONOR],
};

const authenticateUser = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return next();
  }
  const [, accessToken] = authorization.split(" ");
  if (!accessToken) {
    return next();
  }
  try {
    const { id, role, platform } = verifyToken(accessToken);

    if (!platformRoles[platform].includes(role)) {
      return next();
    }

    db.getUserById({ id }).then((result) => {
      const user = result[0][0];
      if (user) {
        req.user = user;
      }
      next();
    });
  } catch (error) {
    console.log(error);
    next();
  }
};

export default authenticateUser;
