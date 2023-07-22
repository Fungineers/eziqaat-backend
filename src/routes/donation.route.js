import { roles } from "@/constants";
import acceptPendingDonation from "@/controllers/accept-pending-donation";
import addNewCollection, {
  addNewCollectionValidator,
} from "@/controllers/add-new-collection";
import addPendingDonationRegistered, {
  addPendingDonationRegisteredValidator,
} from "@/controllers/add-pending-donation-registered";
import addPendingDonationUnregistered, {
  addPendingDonationUnregisteredValidator,
} from "@/controllers/add-pending-donation-unregistered";
import approveDonationRequest from "@/controllers/approve-donation-request";
import collectAcceptedDonation from "@/controllers/collect-accepted-donation";
import donorDonationRequest, {
  donorDonationRequestValidator,
} from "@/controllers/donor-donation-request";
import getDonationInfo from "@/controllers/get-donation-info";
import getDonorRequests from "@/controllers/get-donor-requests";
import getRequestedDonations from "@/controllers/get-requested-donations";
import authorizeRole from "@/middleware/authorize-role";
import validateBody from "@/middleware/validate-body";
import verifyLogin from "@/middleware/verify-login";
import { Router } from "express";

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

donationRouter.post(
  "/registered",
  ...addPendingDonationRegisteredValidator,
  validateBody,
  addPendingDonationRegistered
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
  collectAcceptedDonation
);

donationRouter.post(
  "/new",
  verifyLogin,
  authorizeRole([roles.WORKER]),
  ...addNewCollectionValidator,
  validateBody,
  addNewCollection
);

donationRouter.get("/:donationId", verifyLogin, getDonationInfo);

export default donationRouter;
