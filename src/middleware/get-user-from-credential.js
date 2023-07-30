const db = require("../database");

const getUserFromCredential = (credential, name) => (req, res, next) => {
  db.getUserFromCredential({ credential })
    .then((result) => {
      const user = result[0][0];
      if (user) {
        req[name] = user;
      }
    })
    .catch((err) => {
      req[name] = { error: err.sqlMessage };
    })
    .finally(() => {
      next();
    });
};

module.exports = getUserFromCredential;
