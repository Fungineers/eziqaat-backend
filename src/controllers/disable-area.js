const { regexps } = require("../constants");
const { body } = require("express-validator");
const db = require("../database");

module.exports.disableArea = (req, res) => {
  const { id } = req.params;

  db.disableArea({ id })
    .then((result) => {
      const { affectedRows } = result[0];
      if (affectedRows === 0) {
        res.status(403).json({
          message: "Couldn't disable area",
        });
      } else {
        res.status(200).json({ message: "Area disabled successfully" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({
        message: error.sqlMessage,
      });
    });
};
