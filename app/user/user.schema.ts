import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string; // Optional initially for password setup
  role: "USER";
  refreshToken?: string;
  token?: string;
  isBlocked:Boolean
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // Optional for initial creation
  role: { type: String, enum: ["USER"], required: true },
  refreshToken: { type: String }, // Add refreshToken field
  isBlocked: { type: Boolean, default: false },
  token: { type: String, default: null }, // Temporary token for password setup
});

export const User = mongoose.model<IUser>("User", userSchema);
