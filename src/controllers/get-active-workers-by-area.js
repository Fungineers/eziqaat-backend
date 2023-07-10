import db from "@/database";

const getActiveWorkersByArea = (req, res) => {
  const { area } = req.user;

  if (!area) {
    return res.status(403).json({ message: "You don't have an area assigned" });
  }

  const { id: areaId } = area;

  db.getActiveWorkersByAreaId({ areaId })
    .then((result) => {
      const workers = result[0];
      res.status(200).json({ message: "Workers found successfully", workers });
    })
    .catch((err) => {
      res.status(400).json({ message: err.sqlMessage });
    });
};

export default getActiveWorkersByArea;
