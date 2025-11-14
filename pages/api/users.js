import connectDB from "../../../lib/mongodb";
import User from "../../models/User";

export default async function handler(req, res) {
  await connectDB();

  // Create a user (simple)
  if (req.method === "POST") {
    try {
      const { email } = req.body || {};

      if (!email) {
        return res
          .status(400)
          .json({ success: false, message: "Email required" });
      }

      const user = await User.create({ email });

      return res.status(201).json({ success: true, user });
    } catch (err) {
      console.error("Users POST error:", err);
      return res
        .status(500)
        .json({ success: false, message: "Server error creating user" });
    }
  }

  // List all users
  if (req.method === "GET") {
    try {
      const users = await User.find().sort({ createdAt: -1 });
      return res.status(200).json({ success: true, users });
    } catch (err) {
      console.error("Users GET error:", err);
      return res
        .status(500)
        .json({ success: false, message: "Server error loading users" });
    }
  }

  return res.status(405).json({ success: false, message: "Method not allowed" });
}
