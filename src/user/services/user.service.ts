import { BadGatewayException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/User.schema';
import { Model, ObjectId } from 'mongoose';
import { CreateUserDTO } from '../dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { ResponseCreateUserDto } from '../dto/response-create-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  async validateExistingEmail(email: string) {
    const user = await this.userModel.findOne({ email });
    if (user) {
      throw new ConflictException('Email already exists');
    }
  }
  async findByEmail(email: string) : Promise<User> {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
  async getUsers() {
    const users = await this.userModel.find();
    return users.map((user) => new ResponseCreateUserDto(user));
  }
  async getUser(id: string) {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return new ResponseCreateUserDto(user);
  }

  async register(body: CreateUserDTO){
    await this.validateExistingEmail(body.email);
    const userCreated = await this.userModel.create({
      ...body,
      password: await bcrypt.hash(body.password, 12),
    });
    return new ResponseCreateUserDto(userCreated);
  }
  async delete(id: ObjectId) {
    const userDeleted = await this.userModel.findByIdAndDelete(id);
    if (!userDeleted) {
      throw new NotFoundException('User not found');
    }
    return new ResponseCreateUserDto({...userDeleted, active: false});
  }
}
