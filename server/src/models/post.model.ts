import { model, Schema } from "mongoose";
import { IPost } from "../interface";

const postSchema = new Schema<IPost>(
  {
    author: { type: Schema.ObjectId, ref: "users" },
    title: { type: String, required: true, min: 10, trim: true },
    description: { type: String, required: true, min: 50, trim: true },
    picture: { type: String, required: true },
  },
  { timestamps: true }
);

export const PostSchema = model("posts", postSchema);
