import { connectDB } from "@/lib/dbConnect";
import AffiliateLink from "@/models/AffiliateLink";
import ClickLog from "@/models/ClickLog";
import requestIp from "request-ip";

export default async function handler(req, res) {
  await connectDB();

  const { slug } = req.query;

  const link = await AffiliateLink.findOne({ slug });

  if (!link) return res.status(404).json({ message: "Invalid link" });

  const ip = requestIp.getClientIp(req);

  await ClickLog.create({
    linkId: link._id,
    ip,
    userAgent: req.headers["user-agent"],
    country: req.headers["x-vercel-ip-country"] || "UNKNOWN",
    device: req.headers["user-agent"],
  });

  link.clicks++;
  await link.save();

  return res.redirect(link.originalUrl);
}
