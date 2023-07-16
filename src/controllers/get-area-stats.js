import db from "@/database";

const getAreaStats = (req, res) => {
  const {
    area: { id: areaId },
  } = req.user;

  db.getAreaStats({ areaId })
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

export default getAreaStats;
