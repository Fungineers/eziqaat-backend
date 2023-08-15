const { getUserArea } = require("../utils");

const getArea = (req, res, next) => {
  const { user } = req;
  if (user) {
    getUserArea(user)
      .then((result) => {
        if (result?.length > 0) {
          try {
            req.user.area = result[0][0];
          } catch (error) {
            req.user.area = null;
          }
        } else {
          req.user.area = null;
        }
      })
      .catch((error) => {
        console.log(error);
        req.user.area = null;
      })
      .finally(() => {
        next();
      });
  } else {
    next();
  }
};

module.exports = getArea;
