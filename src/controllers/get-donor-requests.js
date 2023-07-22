const { default: db } = require("@/database");

const getDonorRequests = (req, res) => {
  const { id: donorId } = req.user;

  db.getDonorRequests({ donorId })
    .then((result) => {
      const donorRequests = result[0];
      res
        .status(200)
        .json({ message: "Donor requests found successfully", donorRequests });
    })
    .catch((err) => {
      res.status(400).json({ message: err.sqlMessage });
    });
};

export default getDonorRequests;
