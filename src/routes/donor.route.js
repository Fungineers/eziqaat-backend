import { roles } from "@/constants";
import getDonorStats from "@/controllers/get-donor-stats";
import authorizeRole from "@/middleware/authorize-role";
import verifyLogin from "@/middleware/verify-login";
import { Router } from "express";

const donorRouter = Router();

donorRouter.get(
  "/stats",
  verifyLogin,
  authorizeRole([roles.DONOR]),
  getDonorStats
);

export default donorRouter;
