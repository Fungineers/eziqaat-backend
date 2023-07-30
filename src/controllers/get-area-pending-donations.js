const db = require("../database");

module.exports.getAreaPendingDonations = (req, res) => {
  const { area } = req.user;
  const { s } = req.query;

  const search = (s || "").toLowerCase().trim();

  const { id: areaId } = area;

  db.getAreaPendingDonations({ areaId, search })
    .then((result) => {
      const donations = result[0];
      res.status(200).json({
        message: "Pending records found successfully",
        donations,
      });
    })
    .catch((err) => {
      res.status(400).json({ message: err.sqlMessage });
    });
};
