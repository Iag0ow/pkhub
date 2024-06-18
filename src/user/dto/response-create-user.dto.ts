import { User } from "../schemas/User.schema";
export class ResponseCreateUserDto {
  constructor(student: User) {

    const {
      _id,
      name,
      email,
      active,
      password,
      createdAt,
      updatedAt
    } = student;

    return {
      _id: String(_id),
      name,
      email,
      active,
      password,
      createdAt,
      updatedAt
    };

  }
}
