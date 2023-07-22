import db from "@/database";

const searchUniqueDonor = (req, res) => {
  const { s } = req.query;

  if (!s) {
    return res.status(400).json({ message: "Search string required" });
  }

  db.searchUniqueDonor({ search: (s || "").toLowerCase().trim() })
    .then((results) => {
      const [donor] = results[0];
      if (!donor) {
        res.status(404).json({ message: "Donor not found" });
      } else {
        res.status(200).json({ message: "Donor found", donor });
      }
    })
    .catch((err) => {
      res.status(400).json({ message: err.sqlMessage });
    });
};

export default searchUniqueDonor;
