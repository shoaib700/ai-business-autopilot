import { connectDB } from "../../lib/mongodb";

export default async function handler(req, res) {
  try {
    await connectDB();
    res.status(200).json({ message: "✅ MongoDB connected successfully!" });
  } catch (error) {
    res.status(500).json({ error: "❌ Connection failed", details: error.message });
  }
}
