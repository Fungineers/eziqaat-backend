import { roles } from "@/constants";
import { connection, queries } from "@/database";
import { verifyRole } from "@/middleware";
import { Router } from "express";

const router = Router();

/**
 * Chairperson adds a pending donation
 */
router.post("/pending", verifyRole([roles.CHAIRPERSON]), (req, res) => {
  const { amount, address, donorId } = req.body;
  const chairpersonId = req.user.id;
  const { sql, params } = queries.addPendingDonation({
    amount,
    address,
    donorId,
    chairpersonId,
  });
  connection.query(sql, params, (error, results) => {
    if (error) {
      return res.status(400).json({
        message: "Couldn't add donation",
        error,
      });
    }
    const donation = results[4][0];
    return res.status(200).json({ donation });
  });
});

export default router;
