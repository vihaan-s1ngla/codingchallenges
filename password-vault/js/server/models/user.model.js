import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import encrypt from "mongoose-encryption";

const passwordItemSchema = new mongoose.Schema({
  label: { type: String, required: true },
  password: { type: String, required: true },
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  vault: [passwordItemSchema],
});

userSchema.plugin(encrypt, {
  encryptionKey: process.env.ENC_KEY,
  signingKey: process.env.SIG_KEY,
  encryptedFields: ["password"],
});

export default mongoose.model("User", userSchema);
