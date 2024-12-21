import { ObjectId } from "mongoose";
import { UploadedFile } from "express-fileupload";
import { IPost } from "../interface";
import { PostSchema } from "../models/post.model";
import fileService from "./file.service";
import PostDto from "../dtos/post.dto";

class PostService {
  async getAllPosts() {
    const posts = await PostSchema.find().populate("author");
    const postsDto = posts.map((post) => new PostDto(post));
    return postsDto;
  }

  async getOnePost(id: string) {
    return await PostSchema.findById(id).populate("author");
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
    const post = await PostSchema.findByIdAndDelete(id);

    if (!post) throw new Error("Post not found");

    return post;
  }
}

export default new PostService();
