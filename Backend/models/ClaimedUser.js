const mongoose = require("mongoose");

const claimedUserSchema = mongoose.Schema({
  ip: {
    type: String,
    required: true,
  },
  cookie: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("ClaimedUser", claimedUserSchema);