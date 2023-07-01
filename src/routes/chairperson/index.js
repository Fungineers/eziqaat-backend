const { roles } = require("@/constants");
const { queries } = require("@/database");
const { verifyRole } = require("@/middleware");
const { Router } = require("express");

const router = Router();

router.get("/dashboard", verifyRole([roles.CHAIRPERSON]), (req, res) => {
  const { id } = req.user;

  const { sql, params } = queries;
});
