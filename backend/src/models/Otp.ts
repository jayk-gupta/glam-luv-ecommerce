import mongoose, { Document, Schema } from "mongoose";

interface IOtp extends Document {
  email: string;
  otp: string;
  createdAt: Date;
}

const OtpSchema = new Schema<IOtp>({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 300 }, // auto-delete after 5 mins
});

const Otp = mongoose.model<IOtp>("Otp", OtpSchema);
export default Otp;
