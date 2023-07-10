import { roles } from "@/constants";
import acceptPendingDonation, {
  acceptPendingDonationValidator,
} from "@/controllers/accept-pending-donation";
import addNewCollection, {
  addNewCollectionValidator,
} from "@/controllers/add-new-collection";
import addPendingDonationRegistered, {
  addPendingDonationRegisteredValidator,
} from "@/controllers/add-pending-donation-registered";
import addPendingDonationUnregistered, {
  addPendingDonationUnregisteredValidator,
} from "@/controllers/add-pending-donation-unregistered";
import approveDonationRequest, {
  approveDonationRequestValidator,
} from "@/controllers/approve-donation-request";
import collectAcceptDonation, {
  collectAcceptDonationValidator,
} from "@/controllers/collect-accepted-donation";
import donorDonationRequest, {
  donorDonationRequestValidator,
} from "@/controllers/donor-donation-request";
import authorizeRole from "@/middleware/authorize-role";
import validateBody from "@/middleware/validate-body";
import verifyLogin from "@/middleware/verify-login";
import { Router } from "express";

const donationRouter = Router();

// Donor request
donationRouter.post(
  "/request",
  verifyLogin,
  authorizeRole([roles.DONOR]),
  ...donorDonationRequestValidator,
  validateBody,
  donorDonationRequest
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
  "/approve",
  ...approveDonationRequestValidator,
  validateBody,
  approveDonationRequest
);

// Worker
donationRouter.patch(
  "/accept",
  ...acceptPendingDonationValidator,
  validateBody,
  acceptPendingDonation
);

donationRouter.patch(
  "/collect",
  ...collectAcceptDonationValidator,
  validateBody,
  collectAcceptDonation
);

donationRouter.post(
  "/new",
  ...addNewCollectionValidator,
  validateBody,
  addNewCollection
);

export default donationRouter;
