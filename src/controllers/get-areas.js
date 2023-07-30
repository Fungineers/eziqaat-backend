const db = require("../database");

module.exports.getAreas = (req, res) => {
  db.getAreas()
    .then((result) => {
      const areas = result[0];
      res.status(200).json({ message: "Areas found successfully", areas });
    })
    .catch((err) => {
      res.status(400).json({ message: err.sqlMessage });
    });
};
