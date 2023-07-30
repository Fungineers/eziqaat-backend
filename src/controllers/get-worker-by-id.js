const db = require("../database");

module.exports.getWorkerById = (req, res) => {
  const { id: workerId } = req.params;

  db.getWorkerDetails({ workerId })
    .then((result) => {
      console.log(result[0]);
      try {
        const [
          [workerDetails],
          [{ collectionCount }],
          [{ totalCashFlow }],
          [{ inProgress }],
        ] = result[0];

        if (workerDetails) {
          res.status(200).json({
            message: "Worker details retrieved sucessfully",
            data: {
              workerDetails,
              collectionCount: +collectionCount,
              totalCashFlow: +totalCashFlow,
              inProgress: +inProgress,
            },
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
