const db = require("../database");

module.exports.addPendingDonationUnregisteredValidator = [];

module.exports.addPendingDonationUnregistered = (req, res) => {
  const {
    area: { id: areaId },
  } = req.user;

  const { refName, refPhone, address, amount } = req.body;

  db.addPendingDonationUnregistered({
    refName,
    refPhone,
    areaId,
    address,
    amount,
  })
    .then((results) => {
      const { affectedRows } = results[0];
      if (affectedRows === 0) {
        res.status(403).json({ message: "Couldn't add record" });
      } else {
        res.status(201).json({ message: "Added pending record successfully" });
      }
    })
    .catch((err) => {
      res.status(400).json({ message: err.sqlMessage });
    });
};
