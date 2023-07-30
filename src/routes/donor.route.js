const { Router } = require("express");
const { verifyLogin, authorizeRole } = require("../middleware");
const { roles } = require("../constants");
const { getDonorStats } = require("../controllers/get-donor-stats");
const { searchUniqueDonor } = require("../controllers/search-unique-donor");

const donorRouter = Router();

donorRouter.get(
  "/stats",
  verifyLogin,
  authorizeRole([roles.DONOR]),
  getDonorStats
);

donorRouter.get("/search-unique", verifyLogin, searchUniqueDonor);

module.exports = donorRouter;
