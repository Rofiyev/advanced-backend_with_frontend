import { NextFunction, Request, Response } from "express";
import { PostModel } from "../models/post.model";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const post = await PostModel.findById(req.params.id);
    const authorId = req.user.id;

    if (post.author !== authorId)
      res.status(400).json({ message: "Only author can edit this post!" });

    next();
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Internal server error";

    res.status(500).json({ message: errorMessage });
  }
};
