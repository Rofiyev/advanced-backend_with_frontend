import { NextFunction, Request, Response } from "express";
import { PostSchema } from "../models/post.model";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const post = await PostSchema.findById(req.params.id);
    const authorId = req.user.id;

    if (post.author.toString() !== authorId) {
      res
        .status(400)
        .json({ message: "Only the author can manage this post!" });
      return;
    }

    next();
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Internal server error";

    res.status(500).json({ message: errorMessage });
  }
};
