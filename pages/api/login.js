// /pages/api/login.js
export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { password } = req.body;
  const correct = process.env.ADMIN_PASSWORD;

  if (password === correct) {
    // Return a simple token (you can later replace with JWT)
    return res.status(200).json({ token: "autopilot_admin_2025" });
  } else {
    return res.status(401).json({ error: "Invalid password" });
  }
}
