import { roles } from "@/constants";
import { connection, queries } from "@/database";
import { verifyRole } from "@/middleware";
import { Router } from "express";

const router = Router();

/**
 * Donor requests for doorstep donation
 */
router.post("/requested", verifyRole([roles.DONOR]), (req, res) => {
  const { id: donorId } = req.user;
  const { amount, address, areaId } = req.body;
  const { sql, params } = queries.requestDonation({
    amount,
    address,
    areaId,
    donorId,
  });
  connection.query(sql, params, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(400).json({
        message: "Couldn't request donation",
        error,
      });
    }
    const donation = results[3][0];
    return res.status(200).json({ donation });
  });
});

router.patch("/:id/approve", verifyRole([roles.CHAIRPERSON]), (req, res) => {
  const { id: chairpersonId } = req.user;
  const { id: donationId } = req.params;
  const { sql, params } = queries.approveDonation({
    donationId,
    chairpersonId,
  });
  connection.query(sql, params, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(400).json({
        message: "Couldn't approve donation request",
        error,
      });
    }
    const { affectedRows, changedRows } = results[2];
    if (affectedRows === 0) {
      return res.status(403).json({
        message: "Donation from other area",
      });
    }
    if (changedRows === 0) {
      return res.status(304).json({
        message: "Your change couldn't take effect",
      });
    }
    return res.status(200).json({
      message: "Donation request accepted successully",
    });
  });
});

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
