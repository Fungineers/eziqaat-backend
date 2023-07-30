const db = require("../database");

module.exports.assignAreaToChairperson = (req, res) => {
  const { areaId, chairpersonId } = req.params;

  db.assignAreaToChairperson({ areaId, chairpersonId })
    .then((result) => {
      const { affectedRows } = result[0];

      if (affectedRows === 0) {
        res.status(403).json({
          message:
            "Couldn't assign chairperson to area. Either it wasn't found, or the chairperson is already assigned to it",
        });
      } else {
        res.status(200).json({ message: "Area assigned successfully" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({
        message: error.sqlMessage,
      });
    });
};
