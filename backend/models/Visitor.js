const mongoose = require("mongoose");

const visitorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    mobile: {
      type: String,
      required: true,
    },

    email: {
      type: String,
    },

    organization: {
      type: String,
    },

    personToMeet: {
      type: String,
      required: true,
    },

    purpose: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      default: "Checked In",
    },

    dateTime: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Visitor", visitorSchema);