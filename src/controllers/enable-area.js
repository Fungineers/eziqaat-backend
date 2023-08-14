const { regexps } = require("../constants");
const { body } = require("express-validator");
const db = require("../database");

module.exports.enableArea = (req, res) => {
  const { id } = req.params;

  db.enableArea({ id })
    .then((result) => {
      const { affectedRows } = result[0];
      if (affectedRows === 0) {
        res.status(403).json({
          message: "Couldn't enable area",
        });
      } else {
        res.status(200).json({ message: "Area enabled successfully" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({
        message: error.sqlMessage,
      });
    });
};
