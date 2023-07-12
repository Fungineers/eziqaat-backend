import getDonorStats from "@/controllers/get-donor-stats";
import { Router } from "express";

const donorRouter = Router();

donorRouter.get("/stats", getDonorStats);

export default donorRouter;
