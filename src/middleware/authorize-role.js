const { roles } = require("../constants");

const authorizeRole = (allowedRoles = roles) => {
  return (req, res, next) => {
    const { user } = req;
    if (!user) {
      return res.status(401).json({ message: "You are not logged in" });
    }
    if (!allowedRoles.includes(user.role)) {
      return res.status(401).json({ message: "Access denied" });
    }
    next();
  };
};

module.exports = authorizeRole;
