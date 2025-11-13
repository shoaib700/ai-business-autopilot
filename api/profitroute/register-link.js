import { connectDB } from "@/lib/dbConnect";
import AffiliateLink from "@/models/AffiliateLink";
import { nanoid } from "nanoid";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  await connectDB();

  const { originalUrl, merchant, payout, fallbackUrl, userId } = req.body;

  const slug = nanoid(8);

  const link = await AffiliateLink.create({
    originalUrl,
    merchant,
    payout,
    fallbackUrl,
    userId,
    slug,
  });

  return res.status(201).json({
    message: "Link registered",
    shortLink: `/out/${slug}`,
    link,
  });
}
