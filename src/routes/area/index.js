import { roles } from "@/constants";
import { queries, connection } from "@/database";
import { verifyRole } from "@/middleware";
import { Router } from "express";

const router = Router();

/**
 * Get all areas
 */
router.get("/", (req, res) => {
  const limit = 20;
  const offset = +req.query.offset || 0;

  const { sql, params } = queries.getAreas({ limit, offset });

  connection.query(sql, params, (error, areas) => {
    if (error) {
      console.log(error);
      return res.status(400).json({ message: "Error fetching areas", error });
    }
    return res.status(200).json({ areas });
  });
});

/**
 * Get all areas with chairperson info (if assigned)
 */
router.get("/with-chairperson", (req, res) => {
  const limit = 20;
  const offset = +req.query.offset || 0;
  const { sql, params } = queries.getAreasWithChairperson({ limit, offset });
  connection.query(sql, params, (error, areasWithChairperson) => {
    if (error) {
      console.log(error);
      return res.status(400).json({ message: "Error fetching data", error });
    }
    return res.status(200).json({ areasWithChairperson });
  });
});

/**
 * Get all areas that are not assigned to any chairperson
 */
router.get("/unassigned", (req, res) => {
  const limit = 20;
  const offset = +req.query.offset || 0;
  const { sql, params } = queries.getUnassignedAreas({ limit, offset });
  connection.query(sql, params, (error, unassignedAreas) => {
    if (error) {
      console.log(error);
      return res.status(400).json({
        message: "Something went wrong",
        error,
      });
    }
    return res.status(200).json({ unassignedAreas });
  });
});

/**
 * Get a specific area by id
 */
router.get("/:id", (req, res) => {
  const { id } = req.params;

  const { sql, params } = queries.getAreaById({ id });

  connection.query(sql, params, (error, results) => {
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

/**
 * Create a new area, provide name
 */
router.post("/", verifyRole([roles.GENERAL_SECRETARY]), (req, res) => {
  const { name } = req.body;
  const { sql, params } = queries.createArea({ name });

  connection.query(sql, params, (error, results) => {
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

/**
 * Update an area by id, set new name
 */
router.put("/:id", verifyRole([roles.GENERAL_SECRETARY]), (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const { sql, params } = queries.updateArea({ id, name });
  connection.query(sql, params, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(400).json({ message: "Couldn't update area", error });
    }
    const area = results[1][0];
    return res.status(200).json({ area });
  });
});

/**
 * Delete an area
 */
router.delete("/:id", verifyRole([roles.GENERAL_SECRETARY]), (req, res) => {
  const { id } = req.params;
  const { sql, params } = queries.deleteArea({ id });
  connection.query(sql, params, (error) => {
    if (error) {
      console.log(error);
      return res.status(400).json({ message: "Couldn't delete area", error });
    }
    return res.status(200).json({ message: "Area successfully deleted" });
  });
});

/**
 * Assign an area by id, to a chairperson given his/her id
 */
router.post(
  "/:id/chairperson/:chairpersonId",
  verifyRole([roles.GENERAL_SECRETARY]),
  (req, res) => {
    const { id: areaId, chairpersonId } = req.params;

    const { sql, params } = queries.assignAreaToChairperson({
      areaId,
      chairpersonId,
    });

    connection.query(sql, params, (error, results) => {
      if (error) {
        console.log(error);
        return res
          .status(400)
          .json({ message: "Couldn't assign chairperson to area", error });
      }
      const data = results[3][0];
      return res.status(200).json({ data });
    });
  }
);

/**
 * Unassign an area by id, from a chairperson given his/her id
 */
router.delete(
  "/:id/chairperson/:chairpersonId",
  verifyRole([roles.GENERAL_SECRETARY]),
  (req, res) => {
    const { id: areaId, chairpersonId } = req.params;
    const { sql, params } = queries.unassignAreaToChairperson({
      areaId,
      chairpersonId,
    });
    connection.query(sql, params, (error, results) => {
      if (error) {
        console.log(error);
        return res
          .status(400)
          .json({ message: "Couldn't unassign area", error });
      }
      const { changedRows } = results[1];
      if (changedRows === 0) {
        return res.status(304).json({ message: "No matching record found" });
      }
      return res.status(200).json({ message: "Area unassigned successully" });
    });
  }
);

export default router;
