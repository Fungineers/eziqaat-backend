import db from "@/database";

const unassignAreaFromChairperson = (req, res) => {
  const { areaId } = req.params;

  db.unassignAreaFromChairperson({ areaId })
    .then((result) => {
      const { affectedRows } = result[0];

      if (affectedRows === 0) {
        res.status(403).json({
          message:
            "Couldn't unassign area. Either it wasn't found or it is already unassigned",
        });
      } else {
        res.status(200).json({ message: "Area unassigned successfully" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({
        message: error.sqlMessage,
      });
    });
};

export default unassignAreaFromChairperson;
