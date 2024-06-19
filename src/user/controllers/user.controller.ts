import { Body, Controller, Delete, Get, Param, Post, UseGuards  } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDTO } from '../dto/create-user.dto';
import { ValidateObjectIdPipe } from 'src/Pipes/validate-object-id.pipe';
import { ObjectId } from 'mongoose';
import { AuthGuard } from 'src/auth/guards/auth-user-jwt.guard';

@UseGuards(AuthGuard)
@Controller('users')
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

  @Delete(':id')
  delete(@Param('id',ValidateObjectIdPipe) id: ObjectId) {
    return this.userService.delete(id);
  }
}
