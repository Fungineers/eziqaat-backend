import db from "@/database";

const getAreaRequestStats = (req, res) => {
  const { area } = req.user;

  const { id: areaId } = area;

  db.getAreaRequestStats({ areaId })
    .then((result) => {
      const data = result[0];
      res
        .status(200)
        .json({ message: "Request stats found successfully", data });
    })
    .catch((err) => {
      res.status(400).json({ message: err.sqlMessage });
    });
};

export default getAreaRequestStats;
