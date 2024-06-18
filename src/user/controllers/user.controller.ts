import { Body, Controller, Delete, Get, Param, Post  } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDTO } from '../dto/create-user.dto';
import { ValidateObjectIdPipe } from 'src/Pipes/validate-object-id.pipe';
import { ObjectId } from 'mongoose';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Get(':id')
  getUser(@Param('id',ValidateObjectIdPipe) id: string) {
    return this.userService.getUser(id);
  }

  @Post('register')
  async create(@Body() body: CreateUserDTO) {
    return this.userService.register(body);
  }

  @Delete(':id')
  delete(@Param('id',ValidateObjectIdPipe) id: ObjectId) {
    return this.userService.delete(id);
  }
}
