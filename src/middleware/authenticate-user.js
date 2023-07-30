const { roles } = require("../constants");
const db = require("../database");
const { verifyToken } = require("../jwt");

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
        if (user.role !== roles.WORKER) {
          const { areaId, assignedAt, ...rest } = user;
          req.user = rest;
        } else {
          req.user = user;
        }
      }
      next();
    });
  } catch (error) {
    console.log(error);
    next();
  }
};

module.exports = authenticateUser;
