import connectDB from "../../../lib/mongodb";
import User from "../../models/User";

export default async function handler(req, res) {
  await connectDB();

  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    const { email } = req.body || {};

    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email required" });
    }

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({ email });
    }

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user,
    });
  } catch (err) {
    console.error("Login API error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Server error during login" });
  }
}
