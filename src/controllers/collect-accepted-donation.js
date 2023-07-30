const db = require("../database");
const { composeCollectionSMS, sendSMS } = require("../sms");

module.exports.collectAcceptedDonation = (req, res) => {
  const donationInfo = req.donationInfo;
  const { donationId } = req.params;
  const { id: workerId } = req.user;

  db.collectAcceptedDonation({ donationId, workerId })
    .then((results) => {
      const { affectedRows } = results[0];
      if (affectedRows === 0) {
        return res.status(404).json({
          message: "Request record not found",
        });
      }
      const phone = donationInfo.donorPhone || donationInfo.refPhone;
      if (phone) {
        sendSMS({
          phone,
          message: composeCollectionSMS({
            id: donationInfo.id,
            amount: donationInfo.amount,
            address: donationInfo.address,
            workerName: donationInfo.workerName,
            workerId: donationInfo.workerId,
            areaName: donationInfo.areaName,
            chairpersonPhone: donationInfo.chairpersonPhone,
          }),
        });
      }
      res.status(200).json({ message: "Collection reported successfully" });
    })
    .catch((err) => {
      return res.status(200).json({ message: err.sqlMessage });
    });
};
