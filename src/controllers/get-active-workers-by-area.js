const db = require("../database");

module.exports.getActiveWorkersByArea = (req, res) => {
  const { area } = req.user;
  const { s } = req.query;

  if (!area) {
    return res.status(403).json({ message: "You don't have an area assigned" });
  }

  const search = (s || "").toLowerCase().trim();

  const { id: areaId } = area;

  db.getActiveWorkersByAreaId({ areaId, search })
    .then((result) => {
      const workers = result[0];
      res.status(200).json({ message: "Workers found successfully", workers });
    })
    .catch((err) => {
      res.status(400).json({ message: err.sqlMessage });
    });
};
