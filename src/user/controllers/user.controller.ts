import { Body, Controller, Delete, Get, Param, Patch, Request, UseGuards  } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { ValidateObjectIdPipe } from 'src/Pipes/validate-object-id.pipe';
import { ObjectId } from 'mongoose';
import { AuthGuard } from 'src/auth/guards/auth-user-jwt.guard';
import { UpdateUserDTO } from '../dto/update-user.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { RoleGuard } from 'src/guards/role.guard';

@UseGuards(AuthGuard,RoleGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles(Role.Admin)
  @Get('admin')
  getUsers() {
    return this.userService.getUsers();
  }

  @Roles(Role.Admin)
  @Get('admin/:id')
  getUser(@Param('id',ValidateObjectIdPipe) id: string) {
    return this.userService.getUserAdmin(id);
  }

  @Roles(Role.Admin)
  @Delete('admin/:id')
  delete(@Param('id',ValidateObjectIdPipe) id: ObjectId) {
    return this.userService.delete(id);
  }

  @Get('/me')
  getUserMe(@Request() req: any) {
    return this.userService.getUser(req.user.sub);
  }

  @Patch('/me')
  updateUserMe(@Request() req: any, @Body() body: UpdateUserDTO) {
    return this.userService.updateUser(req.user.sub, body);
  }

}
