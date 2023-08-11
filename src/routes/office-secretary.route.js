const { Router } = require("express");
const { authorizeRole } = require("../middleware");
const { roles } = require("../constants");

const generalSecretaryRouter = Router();

module.exports = generalSecretaryRouter;
