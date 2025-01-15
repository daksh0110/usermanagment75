import mongoose, { Schema, Document } from "mongoose";

export interface IAdmin extends Document {
  name: string;
  email: string;
  password: string;
  role: "ADMIN";
  refreshToken?: string;
}

const adminSchema = new Schema<IAdmin>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["ADMIN"], required: true },
  refreshToken: { type: String }, // Add refreshToken field
});

export const Admin = mongoose.model<IAdmin>("Admin", adminSchema);
