import { UploadedFile } from "express-fileupload";
import { ObjectId } from "mongoose";

export interface IPost {
  title: string;
  description: string;
  picture: UploadedFile;
  author: ObjectId;
}

export interface IUser {
  email: string;
  password: string;
  isActivated: boolean;
}

export interface IToken {
  user: ObjectId;
  refreshToken: string;
}
