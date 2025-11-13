import { connectDB } from "@/lib/dbConnect";
import AffiliateLink from "@/models/AffiliateLink";

export default async function handler(req, res) {
  await connectDB();

  const links = await AffiliateLink.find();

  for (let link of links) {
    link.smartScore =
      (link.payout * 2) +
      (link.clicks * 0.1) +
      (Math.random() * 5); // AI noise value for testing

    await link.save();
  }

  return res.json({ message: "Smart optimization completed" });
}
