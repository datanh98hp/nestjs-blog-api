import { Controller, Get, Param } from '@nestjs/common';
import { CommentService } from './comment.service';

@Controller('comment')
export class CommentController {
    constructor(
        private commentService:CommentService
    ){}

    @Get(':postId')
   async getCommentByPost(@Param('postId') idPost: number){
        return await this.commentService.getCommentsByPost(idPost);
    }
}
