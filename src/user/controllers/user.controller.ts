import { Body, Controller, Delete, FileTypeValidator, Get, MaxFileSizeValidator, Param, ParseFilePipe, Patch, Post, Request, UploadedFile, UseGuards, UseInterceptors  } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { ValidateObjectIdPipe } from 'src/global/Pipes/validate-object-id.pipe';
import { ObjectId } from 'mongoose';
import { AuthGuard } from 'src/auth/guards/auth-user-jwt.guard';
import { UpdateUserDTO } from '../dto/update-user.dto';
import { Roles } from 'src/global/decorators/roles.decorator';
import { Role } from 'src/global/enums/role.enum';
import { RoleGuard } from 'src/global/guards/role.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from 'src/file/services/file.service';

@UseGuards(AuthGuard,RoleGuard)
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly fileService: FileService
  ) {}

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

  @UseInterceptors(FileInterceptor('file'))
  @Post('me/photo')
  updateUserPhoto(@Request() req: any, @UploadedFile(new ParseFilePipe({ 
    validators: [
      new FileTypeValidator({ 
        fileType: 'image/jpeg'
      }),
      new MaxFileSizeValidator({ 
        maxSize: 1024 * 1024 * 10
      })
    ] })) photo: Express.Multer.File) {
    const userId = req.user.sub;
    return this.fileService.uploadFile(userId, photo);
  }
  

  @Patch('/me')
  updateUserMe(@Request() req: any, @Body() body: UpdateUserDTO) {
    return this.userService.updateUser(req.user.sub, body);
  }

}
