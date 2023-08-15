const db = require("../database");

module.exports.addInhouseCollectionValidators = [];

module.exports.addInhouseCollection = (req, res) => {
  const { refName, refPhone, amount } = req.body;

  db.addInhouseCollection({
    refName,
    refPhone,
    amount,
  })
    .then((results) => {
      const { affectedRows } = results[0];
      if (affectedRows === 0) {
        res.status(403).json({ message: "Couldn't add record" });
      } else {
        res
          .status(201)
          .json({ message: "Added collection record successfully" });
      }
    })
    .catch((err) => {
      res.status(400).json({ message: err.sqlMessage });
    });
};
