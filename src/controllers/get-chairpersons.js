const db = require("../database");

module.exports.getChairpersons = (req, res) => {
  db.getChairperson()
    .then((result) => {
      const chairpersons = result[0];
      res
        .status(200)
        .json({ message: "Chairpersons found successfully", chairpersons });
    })
    .catch((err) => {
      res.status(400).json({ message: err.sqlMessage });
    });
};
