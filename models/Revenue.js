// models/Revenue.js
import mongoose from "mongoose";

const RevenueSchema = new mongoose.Schema(
  {
    source: {
      type: String,
      enum: ["adsense", "affiliate"],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: "USD",
    },
    notes: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Revenue || mongoose.model("Revenue", RevenueSchema);
