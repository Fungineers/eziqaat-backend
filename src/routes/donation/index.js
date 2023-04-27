import { Router } from "express";

const router = Router();

router.post("/pending", (req, res) => {
  const { amount, address, donorId } = req.body;
});

export default router;
