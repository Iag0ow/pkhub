import { User } from "../schemas/User.schema";
export class ResponseCreateUserDto {
  constructor(user: User) {

    const {
      _id,
      name,
      email,
      active,
      createdAt,
      updatedAt
    } = user;

    return {
      _id: String(_id),
      name,
      email,
      active,
      createdAt,
      updatedAt
    };

  }
}
