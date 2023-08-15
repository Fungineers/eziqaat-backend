const db = require("../database");

module.exports.getAllDonors = (req, res) => {
  db.getAllDonors()
    .then((result) => {
      const donors = result[0];
      res.status(200).json({ message: "Donors found successfully", donors });
    })
    .catch((err) => {
      res.status(400).json({ message: err.sqlMessage });
    });
};
