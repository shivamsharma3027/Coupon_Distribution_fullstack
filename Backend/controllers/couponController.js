
// Claim Coupon
const Coupon = require("../models/Coupon");
const ClaimedUser = require("../models/ClaimedUser");

// Claim Coupon
const claimCoupon = async (req, res) => {
  const { ip, cookie } = req.body;

  try {
    // Check if IP is blocked for 1 hour
    const lastClaim = await ClaimedUser.findOne({ ip });
    if (lastClaim) {
      const timeElapsed = new Date() - lastClaim.timestamp; // Time elapsed since last claim
      const timeRemaining = 3600000 - timeElapsed; // Remaining time in milliseconds

      if (timeRemaining > 0) {
        return res.status(400).json({
          message: `You can claim next coupon after ${Math.floor(timeRemaining / 60000)} minutes.`, // Convert to minutes
          timeRemaining, // Send remaining time in milliseconds
        });
      }
    }

    // Check if cookie is already used
    const cookieClaim = await ClaimedUser.findOne({ cookie });
    if (cookieClaim) {
      return res.status(400).json({ message: "You have already claimed a coupon in this session." });
    }

    // Find next available coupon
    const coupon = await Coupon.findOne({ claimed: false });
    if (!coupon) {
      return res.status(400).json({ message: "No more coupons available." });
    }

    // Mark coupon as claimed
    coupon.claimed = true;
    await coupon.save();

    // Save user details
    const claimedUser = new ClaimedUser({ ip, cookie });
    await claimedUser.save();

    res.json({ message: "Coupon claimed successfully!", coupon: coupon.code });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

module.exports = { claimCoupon };