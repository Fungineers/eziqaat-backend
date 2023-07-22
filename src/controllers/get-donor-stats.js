import db from "@/database";

const getDonorStats = (req, res) => {
  const { id: donorId } = req.user;

  db.getDonorStats({ donorId })
    .then((result) => {
      const [[{ collectionCount }], [{ totalCashFlow }], [{ requestCount }]] =
        result[0];
      res.status(200).json({
        message: "Donor stats retrieved sucessfully",
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

export default getDonorStats;
