// pages/api/status.js
import connectDB from "../../lib/mongodb";

export default async function handler(req, res) {
  try {
    await connectDB();

    return res.status(200).json({
      success: true,
      status: "OK",
      db: "connected",
    });
  } catch (err) {
    console.error("❌ Status check DB error:", err.message);

    return res.status(500).json({
      success: false,
      status: "Error",
      db: "connection failed",
      error: err.message, // <-- this will show the REAL reason
    });
  }
}
