const mongoose = require('mongoose');
const Coupon = require('../models/Coupon'); // Adjust the path to your Coupon model

// Function to generate unique coupons
const generateCoupons = async () => {
    try {
        // Check if coupons already exist
        const existingCoupons = await Coupon.countDocuments();
        if (existingCoupons > 0) {
            console.log("Coupons already exist in the database.");
            return;
        }

        // Generate 10 unique coupons
        const coupons = [];
        for (let i = 1; i <= 20; i++) {
            coupons.push({
                code: `COUPON${i}`, // Unique coupon code (e.g., COUPON1, COUPON2, etc.)
                claimed: false,
            });
        }

        // Insert coupons into the database
        await Coupon.insertMany(coupons);
        console.log("20 coupons inserted successfully!");
    } catch (err) {
        console.error("Error generating coupons:", err);
    }
};

// Export the function
module.exports = generateCoupons;