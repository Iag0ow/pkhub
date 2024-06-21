import { Body, Controller, Delete, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth-user-jwt.guard';
import { ContentService } from '../services/content.service';
import { CreateContentDTO } from '../dto/create-content.dto';
import { RoleGuard } from 'src/guards/role.guard';
import { Role } from 'src/enums/role.enum';
import { Roles } from 'src/decorators/roles.decorator';

@UseGuards(AuthGuard,RoleGuard)
@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Get()
  getContents() {
    return this.contentService.getContents();
  }

  @Post()
  postContent(@Request() req: any, @Body() content: CreateContentDTO) {
    content.userId = req.user.sub;
    return this.contentService.postContent(content);
  }
  @Delete(':id')
  deleteContent(@Request() req: any, @Param('id') contentId: string) {
    const userId = req.user.sub;
    return this.contentService.deleteContent(userId,contentId);
  }

  @Roles(Role.Admin)
  @Delete()
  deleteAllContents() {
    return this.contentService.deleteAllContents();
  }
  
}
