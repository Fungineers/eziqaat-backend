import { default as db } from "@/database";

const useDonationInfo = (donationId) => (req, res, next) => {
  db.getDonationInfo({ donationId })
    .then((results) => {
      const [donationInfo] = results[0];
      if (donationInfo) {
        req.donationInfo = donationInfo;
      }
    })
    .catch()
    .finally(next);
};

export default useDonationInfo;
