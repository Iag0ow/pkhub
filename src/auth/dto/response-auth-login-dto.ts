import { User } from "src/user/schemas/User.schema";

export class ResponseAuthDTO {
  constructor(user: User, token: string) {

    const {
      _id,
      name,
      email
    } = user;
    const access_token = token;

    return {
      _id: String(_id),
      name,
      email,
      access_token
    };

  }
}
