import { roles } from "@/constants";
import assignAreaToChairperson from "@/controllers/assign-area-to-chairperson";
import changeAreaName, {
  changeAreaNameValidators,
} from "@/controllers/change-area-name";
import createArea, { createAreaValidators } from "@/controllers/create-area";
import getAreaDailyStats from "@/controllers/get-area-daily-stats";
import getAreaPendingDonations from "@/controllers/get-area-pending-donations";
import getAreaPendingStats from "@/controllers/get-area-pending-stats";
import getAreaRequestStats from "@/controllers/get-area-request-stats";
import getAreaRequestedDonations from "@/controllers/get-area-requested-donations";
import getAreaStats from "@/controllers/get-area-stats";
import getAreas from "@/controllers/get-areas";
import unassignAreaFromChairperson from "@/controllers/unassign-area-from-chairperson";
import authorizeRole from "@/middleware/authorize-role";
import hasAreaAssigned from "@/middleware/has-area-assigned";
import validateBody from "@/middleware/validate-body";
import verifyLogin from "@/middleware/verify-login";
import { Router } from "express";

const areaRouter = Router();

areaRouter.post(
  "/",
  verifyLogin,
  authorizeRole([roles.GENERAL_SECRETARY]),
  ...createAreaValidators,
  validateBody,
  createArea
);

areaRouter.get("/", getAreas);

areaRouter.patch(
  "/:id",
  verifyLogin,
  authorizeRole([roles.GENERAL_SECRETARY]),
  ...changeAreaNameValidators,
  validateBody,
  changeAreaName
);

areaRouter.patch(
  "/:areaId/assign/:chairpersonId",
  verifyLogin,
  authorizeRole([roles.GENERAL_SECRETARY]),
  assignAreaToChairperson
);

areaRouter.patch(
  "/:areaId/unassign",
  verifyLogin,
  authorizeRole([roles.GENERAL_SECRETARY]),
  unassignAreaFromChairperson
);

areaRouter.get(
  "/stats",
  verifyLogin,
  authorizeRole([roles.CHAIRPERSON]),
  hasAreaAssigned,
  getAreaStats
);

areaRouter.get(
  "/stats",
  verifyLogin,
  authorizeRole([roles.CHAIRPERSON]),
  hasAreaAssigned,
  getAreaStats
);

areaRouter.get(
  "/daily-stats",
  verifyLogin,
  authorizeRole([roles.CHAIRPERSON]),
  hasAreaAssigned,
  getAreaDailyStats
);

areaRouter.get(
  "/request-stats",
  verifyLogin,
  authorizeRole([roles.CHAIRPERSON]),
  hasAreaAssigned,
  getAreaRequestStats
);

areaRouter.get(
  "/requested-donations",
  verifyLogin,
  authorizeRole([roles.CHAIRPERSON]),
  hasAreaAssigned,
  getAreaRequestedDonations
);

areaRouter.get(
  "/pending-stats",
  verifyLogin,
  authorizeRole([roles.CHAIRPERSON]),
  hasAreaAssigned,
  getAreaPendingStats
);

areaRouter.get(
  "/pending-donations",
  verifyLogin,
  authorizeRole([roles.CHAIRPERSON, roles.WORKER]),
  hasAreaAssigned,
  getAreaPendingDonations
);

export default areaRouter;
