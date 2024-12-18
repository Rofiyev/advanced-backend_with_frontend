import { Router } from "express";
import postController from "../controllers/post.controller";
import authMiddleware from "../middlewares/auth.middleware";
import authorMiddleware from "../middlewares/author.middleware";

const router: Router = Router();

router.get("/", postController.getAllPosts);
router.get("/:id", postController.getOnePost);
router.post("/create", authMiddleware, postController.createPost);
router.patch(
  "/edit/:id",
  authMiddleware,
  authorMiddleware,
  postController.editPost
);
router.delete(
  "/delete/:id",
  authMiddleware,
  authorMiddleware,
  postController.deletePost
);

export default router;
