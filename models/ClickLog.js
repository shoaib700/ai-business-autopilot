import mongoose from "mongoose";

const ClickLogSchema = new mongoose.Schema(
  {
    linkId: { type: mongoose.Schema.Types.ObjectId, ref: "AffiliateLink" },
    ip: String,
    userAgent: String,
    country: String,
    device: String,
  },
  { timestamps: true }
);

export default mongoose.models.ClickLog ||
  mongoose.model("ClickLog", ClickLogSchema);
