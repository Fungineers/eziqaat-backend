const { default: db } = require("@/database");

const getDonorRequests = (req, res) => {
  const { id: donorId } = req.user;

  db.getDonorRequests({ donorId })
    .then((result) => {
      const donations = result[0];
      res
        .status(200)
        .json({ message: "Donor requests found successfully", donations });
    })
    .catch((err) => {
      res.status(400).json({ message: err.sqlMessage });
    });
};

export default getDonorRequests;
