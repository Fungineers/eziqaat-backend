const { Router } = require("express");
const { loginValidators, login } = require("../controllers/login");
const { validateBody } = require("../middleware");
const { getCurrentUser } = require("../controllers/get-current-user");

const authRouter = Router();

authRouter.post("/login", ...loginValidators, validateBody, login);

authRouter.get("/me", getCurrentUser);

module.exports = authRouter;
