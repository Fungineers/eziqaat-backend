const { roles, status } = require("../constants");
const db = require("../database");

module.exports.getAdminStats = (req, res) => {
  db.getAdminStats()
    .then((result) => {
      const queryResults = result[0];

      console.log(queryResults[3]);

      // Count Stats
      const countStats = queryResults[0].reduce(
        (prev, curr) => {
          return { ...prev, [curr.status]: curr.count };
        },
        {
          [status.REQUESTED]: 0,
          [status.PENDING]: 0,
          [status.ACCEPTED]: 0,
          [status.COLLECTED]: 0,
        }
      );

      // Cash Flow
      const [{ cashFlow }] = queryResults[1];

      // Area Cash Flows
      const areaStats = queryResults[2];

      // Weekly Data
      const weeklyDataRaw = queryResults[3];

      const weeklyData = [];

      for (let i = 0; i < 10; i++) {
        const u = weeklyDataRaw.find((w) => w.weeksAgo === i) || {
          weeksAgo: i,
          totalAmount: 0,
          collectionCount: 0,
        };
        weeklyData.push(u);
      }

      res.status(200).json({ countStats, cashFlow, areaStats, weeklyData });
    })
    .catch((err) => {
      res
        .status(400)
        .json({ message: err?.sqlMessage || "Something went wrong" });
    });
};
