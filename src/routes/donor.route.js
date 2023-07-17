import { roles } from "@/constants";
import getDonorStats from "@/controllers/get-donor-stats";
import searchUniqueDonor from "@/controllers/search-unique-donor";
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

donorRouter.get("/search-unique", verifyLogin, searchUniqueDonor);

export default donorRouter;
