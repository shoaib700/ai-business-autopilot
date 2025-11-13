import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" },       // user or admin
    apiKey: { type: String },                       // auto-generated later
    createdAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
