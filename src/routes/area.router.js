const { roles } = require("@/constants");
const { queries, connection } = require("@/database");
const { verifyRole } = require("@/middleware");
const { Router } = require("express");

const router = Router();

router.get("/", (req, res) => {
  const limit = 20;
  const offset = +req.query.offset || 0;

  const { query, params } = queries.getAreas({ limit, offset });

  connection.query(query, params, (error, areas) => {
    if (error) {
      console.log(error);
      return res.status(400).json({ message: "Error fetching areas", error });
    }
    return res.status(200).json({ areas });
  });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  const { query, params } = queries.getAreaById({ id });

  connection.query(query, params, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(400).json({ message: "Error fetching areas", error });
    }
    const area = results[0];
    if (area) {
      return res.status(200).json({ area });
    }
    return res.status(404).json({ message: "Area not found" });
  });
});

router.post("/", verifyRole(roles.GENERAL_SECRETARY), (req, res) => {
  const { name } = req.body;
  const { query, params } = queries.createArea({ name });

  connection.query(query, params, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(400).json({
        message: "Couldn't create area",
        error,
      });
    }
    const area = results[3][0];
    return res.status(200).json({ area });
  });
});

router.put("/:id", verifyRole(roles.GENERAL_SECRETARY), (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const { query, params } = queries.updateArea({ id, name });
  connection.query(query, params, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(400).json({ message: "Couldn't update area", error });
    }
    const area = results[1][0];
    return res.status(200).json({ area });
  });
});

router.delete("/:id", verifyRole(roles.GENERAL_SECRETARY), (req, res) => {
  const { id } = req.params;
  const { query, params } = queries.deleteArea({ id });
  connection.query(query, params, (error) => {
    if (error) {
      console.log(error);
      return res.status(400).json({ message: "Couldn't delete area", error });
    }
    return res.status(200).json({ message: "Area successfully deleted" });
  });
});

export default router;
