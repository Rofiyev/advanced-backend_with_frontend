import { model, Schema } from "mongoose";
import { IToken } from "../interface";

const tokenSchema = new Schema<IToken>({
  user: { type: Schema.ObjectId, ref: "User" },
  refreshToken: { type: String, require: true },
});

export const TokenSchema = model("token", tokenSchema);