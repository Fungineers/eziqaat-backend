import db from "@/database";

const getDonationInfo = (req, res) => {
  const { donationId } = req.params;

  db.getDonationInfo({ donationId }).then((results) => {
    const [donationInfo] = results[0];
    if (!donationInfo) {
      res.status(404).json({ message: "Record not found" });
    } else {
      res.status(200).json({ message: "Record found", data: donationInfo });
    }
  });
};

export default getDonationInfo;
