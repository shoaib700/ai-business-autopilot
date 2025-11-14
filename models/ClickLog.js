import mongoose from "mongoose";

const ClickLogSchema = new mongoose.Schema(
  {
    affiliate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AffiliateLink",
    },
    ip: String,
    userAgent: String,
    sourcePage: String,
  },
  { timestamps: true }
);

export default mongoose.models.ClickLog ||
  mongoose.model("ClickLog", ClickLogSchema);
