import mongoose from "mongoose";

const AffiliateLinkSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    url: { type: String, required: true },
    network: { type: String, default: "generic" },
  },
  { timestamps: true }
);

export default mongoose.models.AffiliateLink ||
  mongoose.model("AffiliateLink", AffiliateLinkSchema);
