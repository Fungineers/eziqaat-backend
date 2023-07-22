import db from "@/database";

const getRequestedDonations = (req, res) => {
  const { area } = req.user;
  if (!area) {
    return res.status(403).json({ message: "You don't have an area assigned" });
  }
  const { id: areaId } = area;
  db.getRequestedDonations({ areaId })
    .then((result) => {
      const requestedDonations = result[0];
      if (requestedDonations) {
        res
          .status(200)
          .json({ message: "Requested donations found", requestedDonations });
      } else {
        res.status(400).json({ message: "Something went wrong" });
      }
    })
    .catch((err) => {
      res.status(400).json({ message: err.sqlMessage });
    });
};

export default getRequestedDonations;
