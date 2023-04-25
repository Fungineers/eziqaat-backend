const verifyRole = (requiredRoles) => (req, res, next) => {
  if (req.user) {
    const { role } = req.user;
    if (!requiredRoles.includes(role)) {
      return res.status(401).json({
        error: "Couldn't process request",
        message: "Access Denied",
      });
    } else {
      next();
    }
  } else {
    return res.status(401).json({
      error: "Couldn't process request",
      message: "You are not signed in with a valid token",
    });
  }
};

export default verifyRole;
