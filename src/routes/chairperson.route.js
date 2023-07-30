const { Router } = require("express");
const { verifyLogin, authorizeRole } = require("../middleware");
const { roles } = require("../constants");
const { getDonorStats } = require("../controllers/get-donor-stats");

const donorRouter = Router();

donorRouter.get(
  "/stats",
  verifyLogin,
  authorizeRole([roles.DONOR]),
  getDonorStats
);

module.exports = donorRouter;
