const express = require("express");
const { claimCoupon } = require("../controllers/couponController");

const router = express.Router();

// POST /api/claim
router.post("/claim", claimCoupon);

module.exports = router;