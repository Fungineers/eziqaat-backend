const db = require("../database");

module.exports.getAllDonations = (req, res) => {
  db.getAllDonations()
    .then((result) => {
      const donations = result[0];
      res
        .status(200)
        .json({ message: "Donations found successfully", donations });
    })
    .catch((err) => {
      res.status(400).json({ message: err.sqlMessage });
    });
};
