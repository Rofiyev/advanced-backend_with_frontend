import AuthorDto from "./author.dto";

export default class PostDto {
  id: string;
  title: string;
  description: string;
  picture: string;
  createdAt: string;
  updatedAt: string;
  author: AuthorDto;

  constructor(model) {
    this.id = model._id.toString();
    this.title = model.title;
    this.description = model.description;
    this.picture = model.picture;
    this.createdAt = model.createdAt.toISOString();
    this.updatedAt = model.updatedAt.toISOString();
    this.author = new AuthorDto(model.author);
  }
}
