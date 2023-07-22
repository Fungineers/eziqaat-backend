import db from "@/database";

const getWorkerAcceptedDonations = (req, res) => {
  const { id: workerId } = req.user;
  const { s } = req.query;

  const search = (s || "").toLowerCase().trim();

  db.getWorkerAcceptedDonations({ workerId, search })
    .then((result) => {
      const acceptedDonations = result[0];
      res.status(200).json({
        message: "Accepted records found successfully",
        acceptedDonations,
      });
    })
    .catch((err) => {
      res.status(400).json({ message: err.sqlMessage });
    });
};

export default getWorkerAcceptedDonations;