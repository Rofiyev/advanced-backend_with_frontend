import { ObjectId } from "mongoose";

export default class AuthorDto {
  id: ObjectId;
  email: string;

  constructor(model) {
    this.id = model._id;
    this.email = model.email;
  }
}
