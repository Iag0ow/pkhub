import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth-user-jwt.guard';
import { ContentService } from '../services/content.service';
import { CreateContentDTO } from '../dto/create-content.dto';
import { RoleGuard } from 'src/global/guards/role.guard';
import { Role } from 'src/global/enums/role.enum';
import { Roles } from 'src/global/decorators/roles.decorator';
import { ValidateObjectIdPipe } from 'src/global/Pipes/validate-object-id.pipe';
import { CreateCommentDTO } from '../dto/create-comment.dto';
import { DeleteCommentDTO } from '../dto/delete-comment.dto';

@UseGuards(AuthGuard, RoleGuard)
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

  @Patch('comment/:id')
  commentContent(
    @Request() req: any,
    @Param('id', ValidateObjectIdPipe) contentId: string,
    @Body() text: CreateCommentDTO,
  ) {
    const userId = req.user.sub;
    return this.contentService.commentContent(userId, contentId, text);
  }

  @Patch(':id')
  likeContent(
    @Request() req: any,
    @Param('id', ValidateObjectIdPipe) contentId: string,
  ) {
    const userId = req.user.sub;
    return this.contentService.likeContent(userId, contentId);
  }

  @Delete('comment')
  deleteComment(@Request() req: any, @Body() body: DeleteCommentDTO) {
    const userId = req.user.sub;
    return this.contentService.deleteComment(
      userId,
      body.contentId,
      body.commentId,
    );
  }

  @Delete(':id')
  deleteContent(
    @Request() req: any,
    @Param('id', ValidateObjectIdPipe) contentId: string,
  ) {
    const userId = req.user.sub;
    return this.contentService.deleteContent(userId, contentId);
  }

  @Roles(Role.Admin)
  @Delete()
  deleteAllContents() {
    return this.contentService.deleteAllContents();
  }
}
