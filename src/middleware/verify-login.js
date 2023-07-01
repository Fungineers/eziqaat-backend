const verifyLogin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "You are not logged in" });
  }
  next();
};

export default verifyLogin;
