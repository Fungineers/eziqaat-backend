import db from "@/database";

const getAreaPendingStats = (req, res) => {
  const { area } = req.user;

  const { id: areaId } = area;

  db.getAreaPendingStats({ areaId })
    .then((result) => {
      const data = result[0];
      res
        .status(200)
        .json({ message: "Pending stats found successfully", data });
    })
    .catch((err) => {
      res.status(400).json({ message: err.sqlMessage });
    });
};

export default getAreaPendingStats;
