import db from "@/database";

const getWorkerCollectedDonations = (req, res) => {
  const { id: workerId } = req.user;
  const { s } = req.query;

  const search = (s || "").toLowerCase().trim();

  db.getWorkerCollectedDonations({ workerId, search })
    .then((result) => {
      const donations = result[0];
      res.status(200).json({
        message: "Collected records found successfully",
        donations,
      });
    })
    .catch((err) => {
      res.status(400).json({ message: err.sqlMessage });
    });
};

export default getWorkerCollectedDonations;
