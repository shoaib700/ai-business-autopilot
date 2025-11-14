import connectDB from "../../lib/mongodb";
import User from "../../models/User";   // << FIXED CASE

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "POST") {
    try {
      const { email } = req.body;
      const user = await User.create({ email });
      return res.status(201).json({ success: true, user });
    } catch (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
  }

  if (req.method === "GET") {
    try {
      const users = await User.find().sort({ createdAt: -1 });
      return res.status(200).json({ success: true, users });
    } catch (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
  }

  return res.status(405).end();
}
