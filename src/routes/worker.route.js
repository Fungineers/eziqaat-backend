const { Router } = require("express");
const { authorizeRole, validateBody } = require("../middleware");
const { roles } = require("../constants");
const {
  createWorkerValidators,
  createWorker,
} = require("../controllers/create-worker");
const { getWorkerStats } = require("../controllers/get-worker-stats");
const {
  getWorkerAcceptedDonations,
} = require("../controllers/get-worker-accepted-donations");
const {
  getWorkerCollectedDonations,
} = require("../controllers/get-worker-collected-donations");
const {
  getInActiveWorkersByArea,
} = require("../controllers/get-inactive-workers-by-area");
const {
  getActiveWorkersByArea,
} = require("../controllers/get-active-workers-by-area");
const { getWorkerById } = require("../controllers/get-worker-by-id");

const workerRouter = Router();

workerRouter.post(
  "/",
  authorizeRole([roles.CHAIRPERSON]),
  ...createWorkerValidators,
  validateBody,
  createWorker
);

workerRouter.get("/stats", authorizeRole([roles.WORKER]), getWorkerStats);

workerRouter.get(
  "/accepted-donations",
  authorizeRole([roles.WORKER]),
  getWorkerAcceptedDonations
);

workerRouter.get(
  "/collected-donations",
  authorizeRole([roles.WORKER]),
  getWorkerCollectedDonations
);

workerRouter.get(
  "/",
  authorizeRole([roles.CHAIRPERSON]),
  getActiveWorkersByArea
);

workerRouter.get(
  "/inactive",
  authorizeRole([roles.CHAIRPERSON]),
  getInActiveWorkersByArea
);

workerRouter.get("/:id", authorizeRole([roles.CHAIRPERSON]), getWorkerById);

module.exports = workerRouter;
