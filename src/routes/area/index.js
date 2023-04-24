import { roles } from "@/constants";
import { queries, connection } from "@/database";
import { verifyRole } from "@/middleware";
import { Router } from "express";

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

router.post("/", verifyRole([roles.GENERAL_SECRETARY]), (req, res) => {
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

router.put("/:id", verifyRole([roles.GENERAL_SECRETARY]), (req, res) => {
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

router.delete("/:id", verifyRole([roles.GENERAL_SECRETARY]), (req, res) => {
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

router.post(
  "/:id/chairperson/:chairpersonId",
  verifyRole([roles.GENERAL_SECRETARY]),
  (req, res) => {
    const { id: areaId, chairpersonId } = req.params;

    const { query, params } = queries.assignAreaToChairperson({
      areaId,
      chairpersonId,
    });

    connection.query(query, params, (error, results) => {
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

router.delete(
  "/:id/chairperson/:chairpersonId",
  verifyRole([roles.GENERAL_SECRETARY]),
  (req, res) => {
    const { id: areaId, chairpersonId } = req.params;
    const { query, params } = queries.unassignAreaToChairperson({
      areaId,
      chairpersonId,
    });
    connection.query(query, params, (error, results) => {
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

router.get("/with/chairperson", (req, res) => {
  const limit = 20;
  const offset = +req.query.offset || 0;
  const { query, params } = queries.getAreasWithChairperson({ limit, offset });
  connection.query(query, params, (error, data) => {
    if (error) {
      console.log(error);
      return res.status(400).json({ message: "Error fetching data", error });
    }
    return res.status(200).json({ data });
  });
});

export default router;
