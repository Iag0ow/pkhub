import { User } from "../schemas/User.schema";

export class ResponseUserDTO {
  _id: string;
  name: string;
  email: string;
  profilePic?: string;
  bio?: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(user: User) {
    this._id = String(user._id);
    this.name = user.name;
    this.email = user.email;
    this.profilePic = user.profilePic;
    this.bio = user.bio;
    this.active = user.active;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}
