import { connectDB } from "@/lib/dbConnect";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { signToken } from "@/lib/jwt";
import { serialize } from "cookie";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  await connectDB();

  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user)
    return res.status(400).json({ message: "Invalid email or password" });

  const valid = await bcrypt.compare(password, user.password);

  if (!valid)
    return res.status(400).json({ message: "Invalid email or password" });

  const token = signToken(user);

  res.setHeader(
    "Set-Cookie",
    serialize("token", token, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    })
  );

  return res.status(200).json({ message: "Login successful", user });
}
