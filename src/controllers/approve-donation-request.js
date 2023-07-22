import db from "@/database";

const approveDonationRequest = (req, res) => {
  const { donationId } = req.params;

  db.approveDonationRequest({ donationId })
    .then((results) => {
      const { affectedRows } = results[0];
      if (affectedRows === 0) {
        return res.status(404).json({
          message: "Request record not found",
        });
      }
      res.status(200).json({ message: "Approved request successfully" });
    })
    .catch((err) => {
      return res.status(200).json({ message: err.sqlMessage });
    });
};

export default approveDonationRequest;
