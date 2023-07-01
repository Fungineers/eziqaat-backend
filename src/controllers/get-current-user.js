const getCurrentUser = (req, res) => {
  const { user } = req;
  if (user) {
    res.status(201).json({
      message: "Retrieved the logged in user",
      user,
    });
  } else {
    res.status(401).json({
      message: "Session has expired",
    });
  }
};

export default getCurrentUser;
