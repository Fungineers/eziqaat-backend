const db = require("../database");

module.exports.getAreaDailyStats = (req, res) => {
  const {
    area: { id: areaId },
  } = req.user;

  db.getAreaDailyStats({ areaId })
    .then((result) => {
      const [[{ collectionCount }], [{ totalCashFlow }], [{ requestCount }]] =
        result[0];
      res.status(200).json({
        message: "Area stats retrieved sucessfully",
        data: {
          collectionCount: +collectionCount,
          totalCashFlow: +totalCashFlow,
          requestCount: +requestCount,
        },
      });
    })
    .catch((err) => {
      res.status(400).json({ message: err.sqlMessage });
    });
};
