import connectDB from "../../lib/mongodb";
import User from "../../models/User";

export default async function handler(req, res) {
  await connectDB();

  if (req.method !== "PUT") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    const { userId, updates } = req.body || {};

    if (!userId || !updates) {
      return res.status(400).json({
        success: false,
        message: "User ID and update data required",
      });
    }

    const user = await User.findByIdAndUpdate(userId, updates, {
      new: true,
    });

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      user,
    });
  } catch (err) {
    console.error("Update API error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Server error updating user" });
  }
}
