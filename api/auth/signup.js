import { connectDB } from "@/lib/dbConnect";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { signToken } from "@/lib/jwt";
import { serialize } from "cookie";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  await connectDB();

  const { name, email, password } = req.body;

  const existing = await User.findOne({ email });

  if (existing)
    return res.status(400).json({ message: "Email already exists" });

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashed,
  });

  const token = signToken(user);

  res.setHeader(
    "Set-Cookie",
    serialize("token", token, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    })
  );

  return res.status(201).json({ message: "Signup successful", user });
}
