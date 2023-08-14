const db = require("../database");

module.exports.getOfficeSecretaries = (req, res) => {
  db.getOfficeSecretaries()
    .then((result) => {
      const officeSecretaries = result[0];
      res.status(200).json({
        message: "Office secretaries found successfully",
        officeSecretaries,
      });
    })
    .catch((err) => {
      res.status(400).json({ message: err.sqlMessage });
    });
};
