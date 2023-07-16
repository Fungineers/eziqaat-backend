import { roles } from "@/constants";
import createWorker, {
  createWorkerValidators,
} from "@/controllers/create-worker";
import getActiveWorkersByArea from "@/controllers/get-active-workers-by-area";
import getInActiveWorkersByArea from "@/controllers/get-inactive-workers-by-area";
import getWorkerById from "@/controllers/get-worker-by-id";
import getWorkerStats from "@/controllers/get-worker-stats";
import authorizeRole from "@/middleware/authorize-role";
import validateBody from "@/middleware/validate-body";
import { Router } from "express";

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

export default workerRouter;
