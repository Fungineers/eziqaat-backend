import getCurrentUser from "@/controllers/get-current-user";
import login, { loginValidators } from "@/controllers/login";
import validateBody from "@/middleware/validate-body";
import { Router } from "express";
import { body } from "express-validator";

const authRouter = Router();

authRouter.post("/login", ...loginValidators, validateBody, login);

authRouter.get("/me", getCurrentUser);

export default authRouter;
