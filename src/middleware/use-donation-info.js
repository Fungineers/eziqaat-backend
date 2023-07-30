const db = require("../database");

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

module.exports = useDonationInfo;
