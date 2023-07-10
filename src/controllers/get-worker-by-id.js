import db from "@/database";

const getWorkerById = (req, res) => {
  const { id: workerId } = req.params;

  db.getUserById({ id: workerId })
    .then((result) => {
      try {
        const data = result[0][0];
        if (data) {
          res
            .status(200)
            .json({
              message: "Worker found succesfully",
              workerDetails: { data },
            });
        } else {
          res.status(404).json({ message: "Worker not found" });
        }
      } catch (err) {
        res.status(400).json({ message: "Something went wrong" });
      }
    })
    .catch((err) => {
      res.status(400).json({ message: err.sqlMessage });
    });
};

export default getWorkerById;
