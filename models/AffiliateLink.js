import mongoose from "mongoose";

const AffiliateLinkSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    originalUrl: { type: String, required: true },
    merchant: { type: String },
    geo: { type: [String], default: [] }, 
    payout: { type: Number, default: 0 },
    smartScore: { type: Number, default: 0 },
    clicks: { type: Number, default: 0 },
    slug: { type: String, unique: true },
    fallbackUrl: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.AffiliateLink ||
  mongoose.model("AffiliateLink", AffiliateLinkSchema);
