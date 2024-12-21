import { Request, Response } from "express";
import postService from "../services/post.service";
import { UploadedFile } from "express-fileupload";

class PostController {
  async getAllPosts(req: Request, res: Response) {
    try {
      const allPosts = await postService.getAllPosts();
      res.status(200).json(allPosts);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Internal server error";

      res.status(500).json({ message: errorMessage });
    }
  }

  async getOnePost(req: Request, res: Response) {
    try {
      const post = await postService.getOnePost(req.params.id);
      res.status(200).json(post);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Internal server error";

      res.status(500).json({ message: errorMessage });
    }
  }

  async createPost(req: Request, res: Response) {
    try {
      if (req.files && req.files.picture) {
        const picture = req.files.picture as UploadedFile;
        const post = await postService.createPost(
          req.body,
          picture,
          req.user.id
        );
        res.status(201).json(post);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Internal server error";

      res.status(500).json({ message: errorMessage });
    }
  }

  async editPost(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (req.files && req.files.picture) {
        const picture = req.files.picture as UploadedFile;
        const updates = req.body;

        const updatedPost = await postService.editPost(id, {
          ...updates,
          picture,
        });
        res.status(201).json(updatedPost);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Internal server error";

      res.status(500).json({ message: errorMessage });
    }
  }

  async deletePost(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const post = await postService.deletePost(id);
      res.status(200).json(post);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Internal server error";

      res.status(500).json({ message: errorMessage });
    }
  }
}

export default new PostController();
