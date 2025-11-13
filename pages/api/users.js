import { connectDB } from "../../lib/mongodb";
import User from "@/models/User";

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "POST") {
    const { email } = req.body;
    const user = await User.create({ email });
    return res.status(201).json({ success: true, user });
  }

  if (req.method === "GET") {
    const users = await User.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, users });
  }

  res.status(405).end();
}
