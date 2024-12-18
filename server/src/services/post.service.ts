import { ObjectId } from "mongoose";
import { UploadedFile } from "express-fileupload";
import { IPost } from "../interface";
import { PostModel } from "../models/post.model";
import fileService from "./file.service";

class PostService {
  async getAllPosts() {
    return await PostModel.find();
  }

  async getOnePost(id: string) {
    return await PostModel.findById(id);
  }

  async createPost(post: IPost, picture: UploadedFile, author: ObjectId) {
    const pictureData = fileService.save(picture);
    return await PostModel.create({
      ...post,
      picture: pictureData,
      author,
    });
  }

  async editPost(id: string, data: IPost) {
    const pictureData = fileService.save(data.picture);

    const updatedPost = await PostModel.findByIdAndUpdate(
      id,
      { $set: { ...data, picture: pictureData } },
      { new: true }
    );

    if (!updatedPost) throw new Error("Post not found!");

    return updatedPost;
  }

  async deletePost(id: string) {
    return await PostModel.findByIdAndDelete(id);
  }
}

export default new PostService();
