import { IsNotEmpty } from 'class-validator';
import { IsObjectId } from 'src/global/decorators/objectid.decorator';

export class DeleteCommentDTO {
  @IsObjectId()
  @IsNotEmpty()
  contentId: string;

  @IsObjectId()
  @IsNotEmpty()
  commentId: string;
}
