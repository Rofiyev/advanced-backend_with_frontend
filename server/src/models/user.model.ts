import { model, Schema } from "mongoose";
import { IUser } from "../interface";

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      unique: true,
    },
    password: { type: String, required: true, trim: true, minlength: 8 },
    isActivated: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const UserSchema = model("users", userSchema);
