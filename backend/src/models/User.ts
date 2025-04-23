import mongoose, { Document, Schema } from "mongoose";

interface IUser extends Document{
  email: string,
  password?: string
  otp?: {
    code: string,
    expriesAt: Date 
  }
  name?: string,
  phone?: string,
  createdAt : Date 
}

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: false,
    },
    otp: {
      code: {
        type: String,
        expiresAt: { type: Date },
      },
    },
    name: {
      type: String,
    },
                           
    phone: {
      type: String,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>("User", UserSchema);
export default User;
