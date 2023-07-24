import db from "@/database";

const getAreaAcceptedDonations = (req, res) => {
  const { area } = req.user;
  const { s } = req.query;

  const search = (s || "").toLowerCase().trim();

  const { id: areaId } = area;

  db.getAreaAcceptedDonations({ areaId, search })
    .then((result) => {
      const donations = result[0];
      res
        .status(200)
        .json({ message: "Requests found successfully", donations });
    })
    .catch((err) => {
      res.status(400).json({ message: err.sqlMessage });
    });
};

export default getAreaAcceptedDonations;
