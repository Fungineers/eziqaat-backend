import db from "@/database";

const getAreaRequestedDonations = (req, res) => {
  const { area } = req.user;
  const { s } = req.query;

  const search = s || "";

  const { id: areaId } = area;

  db.getAreaRequestedDonations({ areaId, search })
    .then((result) => {
      const requestedDonations = result[0];
      res
        .status(200)
        .json({ message: "Requests found successfully", requestedDonations });
    })
    .catch((err) => {
      res.status(400).json({ message: err.sqlMessage });
    });
};

export default getAreaRequestedDonations;
