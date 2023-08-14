const { Router } = require("express");
const {
  verifyLogin,
  authorizeRole,
  validateBody,
  useDonationInfo,
  getUserFromCredential,
} = require("../middleware");
const { roles } = require("../constants");
const {
  donorDonationRequestValidator,
  donorDonationRequest,
} = require("../controllers/donor-donation-request");
const {
  getRequestedDonations,
} = require("../controllers/get-requested-donations");
const { getDonorRequests } = require("../controllers/get-donor-requests");
const { getDonorHistory } = require("../controllers/get-donor-history");
const {
  addPendingDonationUnregisteredValidator,
  addPendingDonationUnregistered,
} = require("../controllers/add-pending-donation-unregistered");
const {
  approveDonationRequest,
} = require("../controllers/approve-donation-request");
const {
  acceptPendingDonation,
} = require("../controllers/accept-pending-donation");
const {
  collectAcceptedDonation,
} = require("../controllers/collect-accepted-donation");
const {
  addNewCollectionValidator,
  addNewCollection,
} = require("../controllers/add-new-collection");
const { getDonationInfo } = require("../controllers/get-donation-info");
const { getAllAreas } = require("../controllers/get-all-areas");

const donationRouter = Router();

donationRouter.post(
  "/request",
  verifyLogin,
  authorizeRole([roles.DONOR]),
  ...donorDonationRequestValidator,
  validateBody,
  donorDonationRequest
);

donationRouter.get(
  "/requested",
  verifyLogin,
  authorizeRole([roles.CHAIRPERSON]),
  getRequestedDonations
);

donationRouter.get(
  "/donor-requests",
  verifyLogin,
  authorizeRole([roles.DONOR]),
  getDonorRequests
);

donationRouter.get(
  "/donor-history",
  verifyLogin,
  authorizeRole([roles.DONOR]),
  getDonorHistory
);

donationRouter.post(
  "/unregistered",
  ...addPendingDonationUnregisteredValidator,
  validateBody,
  addPendingDonationUnregistered
);

// Chairperson
donationRouter.patch(
  "/approve/:donationId",
  verifyLogin,
  authorizeRole([roles.CHAIRPERSON]),
  approveDonationRequest
);

// Worker
donationRouter.patch(
  "/accept/:donationId",
  authorizeRole([roles.WORKER]),
  acceptPendingDonation
);

donationRouter.patch(
  "/collect/:donationId",
  authorizeRole([roles.WORKER]),
  (req, res, next) => {
    useDonationInfo(req.params.donationId)(req, res, next);
  },
  collectAcceptedDonation
);

donationRouter.post(
  "/new",
  verifyLogin,
  authorizeRole([roles.WORKER]),
  ...addNewCollectionValidator,
  validateBody,
  (req, res, next) => {
    getUserFromCredential(req.body.donorId, "donor")(req, res, next);
  },
  addNewCollection
);

donationRouter.get("/", getAllAreas);

donationRouter.get("/:donationId", verifyLogin, getDonationInfo);

module.exports = donationRouter;
