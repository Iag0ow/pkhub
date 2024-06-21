import { User } from "src/user/schemas/User.schema";

export class ResponseAuthDTO {
  _id: string;
  name: string;
  email: string;
  access_token: string;
  constructor(user: User, token: string) {
    this._id = String(user._id);
    this.name = user.name;
    this.email = user.email;
    this.access_token = token;
  }
}
