import { roles } from "@/constants";
import getChairpersonStats from "@/controllers/get-chaiperson-stats";
import authorizeRole from "@/middleware/authorize-role";
import verifyLogin from "@/middleware/verify-login";
import { Router } from "express";

const donorRouter = Router();

donorRouter.get(
  "/stats",
  verifyLogin,
  authorizeRole([roles.CHAIRPERSON]),
  getChairpersonStats
);

export default donorRouter;
