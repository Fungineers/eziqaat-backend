import { roles } from "@/constants";
import assignAreaToChairperson from "@/controllers/assign-area-to-chairperson";
import changeAreaName, {
  changeAreaNameValidators,
} from "@/controllers/change-area-name";
import createArea, { createAreaValidators } from "@/controllers/create-area";
import unassignAreaFromChairperson from "@/controllers/unassign-area-from-chairperson";
import authorizeRole from "@/middleware/authorize-role";
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

export default areaRouter;
