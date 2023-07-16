const hasAreaAssigned = (req, res, next) => {
  const { user } = req;

  if (!user.area) {
    return res.status(403).json({ message: "You don't have an area assigned" });
  }

  next();
};

export default hasAreaAssigned;
