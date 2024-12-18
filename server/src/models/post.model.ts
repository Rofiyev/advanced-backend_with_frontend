import { model, Schema } from "mongoose";
import { IPost } from "../interface";

const postSchema = new Schema<IPost>(
  {
    author: { type: Schema.ObjectId, ref: "User" },
    title: { type: String, required: true, min: 10, trim: true },
    description: { type: String, required: true, min: 50, trim: true },
    picture: { type: String, required: true },
  },
  { timestamps: true }
);

export const PostModel = model("posts", postSchema);
