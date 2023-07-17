import db from "@/database";

const acceptPendingDonation = (req, res) => {
  const { donationId } = req.params;
  const { id: workerId } = req.user;

  db.acceptPendingDonation({ donationId, workerId })
    .then((results) => {
      const { affectedRows } = results[0];
      if (affectedRows === 0) {
        return res.status(404).json({
          message: "Request record not found",
        });
      }
      res.status(200).json({ message: "Accepted request successfully" });
    })
    .catch((err) => {
      return res.status(200).json({ message: err.sqlMessage });
    });
};

export default acceptPendingDonation;
