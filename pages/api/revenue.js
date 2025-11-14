import connectDB from "../../../lib/mongodb";
import Revenue from "../../models/Revenue";

export default async function handler(req, res) {
  await connectDB();

  // CREATE entry
  if (req.method === "POST") {
    try {
      const { source, amount, currency = "USD", notes, date } = req.body || {};

      if (!source || !amount) {
        return res
          .status(400)
          .json({ success: false, message: "source and amount are required" });
      }

      const entry = await Revenue.create({
        source,
        amount,
        currency,
        notes,
        date: date ? new Date(date) : new Date(),
      });

      return res.status(201).json({ success: true, data: entry });
    } catch (err) {
      console.error("Revenue POST error:", err);
      return res
        .status(500)
        .json({ success: false, message: "Server error while saving revenue" });
    }
  }

  // LIST entries
  if (req.method === "GET") {
    try {
      const entries = await Revenue.find().sort({ date: -1 });
      return res.status(200).json({ success: true, data: entries });
    } catch (err) {
      console.error("Revenue GET error:", err);
      return res
        .status(500)
        .json({ success: false, message: "Server error while loading revenue" });
    }
  }

  return res.status(405).json({ success: false, message: "Method not allowed" });
}
