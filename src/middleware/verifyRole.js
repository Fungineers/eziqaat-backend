const verifyRole = (requiredRole) => (req, res, next) => {
  if (req.user) {
    console.log(req.user);
    const { role, active } = req.user;
    if (!active) {
      return res.status(401).json({
        error: "Couldn't process request",
        message: "Please confirm your email first",
      });
    } else if (role !== requiredRole) {
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
