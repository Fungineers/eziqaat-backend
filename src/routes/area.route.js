const { Router } = require("express");
const {
  // verifyLogin,
  authorizeRole,
  validateBody,
  hasAreaAssigned,
} = require("../middleware");
const { roles } = require("../constants");
const {
  createAreaValidators,
  createArea,
} = require("../controllers/create-area");
const { getAreas } = require("../controllers/get-areas");
const {
  changeAreaNameValidators,
  changeAreaName,
} = require("../controllers/change-area-name");
const {
  assignAreaToChairperson,
} = require("../controllers/assign-area-to-chairperson");
const {
  unassignAreaFromChairperson,
} = require("../controllers/unassign-area-from-chairperson");
const { getAreaStats } = require("../controllers/get-area-stats");
const { getAreaDailyStats } = require("../controllers/get-area-daily-stats");
const {
  getAreaRequestStats,
} = require("../controllers/get-area-request-stats");
const {
  getAreaRequestedDonations,
} = require("../controllers/get-area-requested-donations");
const {
  getAreaPendingStats,
} = require("../controllers/get-area-pending-stats");
const {
  getAreaPendingDonations,
} = require("../controllers/get-area-pending-donations");
const {
  getAreaAcceptedDonations,
} = require("../controllers/get-area-accepted-donations");
const {
  getAreaCollectedDonations,
} = require("../controllers/get-area-collected-donations");
const { getAllAreas } = require("../controllers/get-all-areas");
const { disableArea } = require("../controllers/disable-area");
const { enableArea } = require("../controllers/enable-area");

const areaRouter = Router();

areaRouter.post(
  "/",
  // verifyLogin,
  // authorizeRole([roles.GENERAL_SECRETARY]),
  ...createAreaValidators,
  validateBody,
  createArea
);

areaRouter.get("/", getAreas);

areaRouter.get("/all", getAllAreas);

areaRouter.patch(
  "/:id",
  // verifyLogin,
  // authorizeRole([roles.GENERAL_SECRETARY]),
  ...changeAreaNameValidators,
  validateBody,
  changeAreaName
);

areaRouter.patch(
  "/:id/disable",
  // verifyLogin,
  // authorizeRole([roles.GENERAL_SECRETARY]),
  disableArea
);

areaRouter.patch(
  "/:id/enable",
  // verifyLogin,
  // authorizeRole([roles.GENERAL_SECRETARY]),
  enableArea
);

areaRouter.patch(
  "/:areaId/assign/:chairpersonId",
  // verifyLogin,
  // authorizeRole([roles.GENERAL_SECRETARY]),
  assignAreaToChairperson
);

areaRouter.patch(
  "/:areaId/unassign",
  // verifyLogin,
  // authorizeRole([roles.GENERAL_SECRETARY]),
  unassignAreaFromChairperson
);

areaRouter.patch(
  "/:areaId/disable",
  // verifyLogin,
  // authorizeRole([roles.GENERAL_SECRETARY]),
  disableArea
);

areaRouter.patch(
  "/:areaId/enable",
  // verifyLogin,
  // authorizeRole([roles.GENERAL_SECRETARY]),
  enableArea
);

areaRouter.get(
  "/stats",
  // verifyLogin,
  authorizeRole([roles.CHAIRPERSON]),
  hasAreaAssigned,
  getAreaStats
);

areaRouter.get(
  "/stats",
  // verifyLogin,
  authorizeRole([roles.CHAIRPERSON]),
  hasAreaAssigned,
  getAreaStats
);

areaRouter.get(
  "/daily-stats",
  // verifyLogin,
  authorizeRole([roles.CHAIRPERSON]),
  hasAreaAssigned,
  getAreaDailyStats
);

areaRouter.get(
  "/request-stats",
  // verifyLogin,
  authorizeRole([roles.CHAIRPERSON]),
  hasAreaAssigned,
  getAreaRequestStats
);

areaRouter.get(
  "/requested-donations",
  // verifyLogin,
  authorizeRole([roles.CHAIRPERSON]),
  hasAreaAssigned,
  getAreaRequestedDonations
);

areaRouter.get(
  "/pending-stats",
  // verifyLogin,
  authorizeRole([roles.CHAIRPERSON]),
  hasAreaAssigned,
  getAreaPendingStats
);

areaRouter.get(
  "/pending-donations",
  // verifyLogin,
  authorizeRole([roles.CHAIRPERSON, roles.WORKER]),
  hasAreaAssigned,
  getAreaPendingDonations
);

areaRouter.get(
  "/accepted-donations",
  // verifyLogin,
  authorizeRole([roles.CHAIRPERSON]),
  hasAreaAssigned,
  getAreaAcceptedDonations
);

areaRouter.get(
  "/collected-donations",
  // verifyLogin,
  authorizeRole([roles.CHAIRPERSON]),
  hasAreaAssigned,
  getAreaCollectedDonations
);

module.exports = areaRouter;
