import { ObjectId } from "mongoose";
import { UploadedFile } from "express-fileupload";
import { IPost } from "../interface";
import { PostSchema } from "../models/post.model";
import fileService from "./file.service";

class PostService {
  async getAllPosts() {
    return await PostSchema.find().populate("author");
  }

  async getOnePost(id: string) {
    return await PostSchema.findById(id);
  }

  async createPost(post: IPost, picture: UploadedFile, author: ObjectId) {
    const pictureData = fileService.save(picture);
    return await PostSchema.create({
      ...post,
      picture: pictureData,
      author,
    });
  }

  async editPost(id: string, data: IPost) {
    const pictureData = fileService.save(data.picture);

    const updatedPost = await PostSchema.findByIdAndUpdate(
      id,
      { $set: { ...data, picture: pictureData } },
      { new: true }
    );

    if (!updatedPost) throw new Error("Post not found!");

    return updatedPost;
  }

  async deletePost(id: string) {
    return await PostSchema.findByIdAndDelete(id);
  }
}

export default new PostService();
