import { ObjectId } from "mongoose";

export default class UserDto {
  email: string;
  id: ObjectId;
  isActivate: boolean;

  constructor(model) {
    this.email = model.email;
    this.id = model._id;
    this.isActivate = model.isActivate;
  }
}
