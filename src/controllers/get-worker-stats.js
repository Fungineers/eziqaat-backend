const db = require("../database");

module.exports.getWorkerStats = (req, res) => {
  const {
    id: workerId,
    area: { id: areaId },
  } = req.user;

  db.getWorkerStats({ workerId, areaId })
    .then((result) => {
      const [
        [{ collectionCount }],
        [{ totalCashFlow }],
        [{ inProgress }],
        [{ pending }],
      ] = result[0];

      res.status(200).json({
        message: "Worker stats retrieved sucessfully",
        data: {
          collectionCount: +collectionCount,
          totalCashFlow: +totalCashFlow,
          inProgress: +inProgress,
          pending: +pending,
        },
      });
    })
    .catch((err) => {
      res.status(400).json({ message: err.sqlMessage });
    });
};
