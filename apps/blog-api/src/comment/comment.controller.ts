import { Controller, Delete, Get, Param } from '@nestjs/common';
import { CommentService } from './comment.service';

@Controller('comment')
export class CommentController {
    constructor(
        private commentService:CommentService
    ){}

    @Get('by_post/:postId')
   async getCommentByPost(@Param('postId') idPost: number){
        return await this.commentService.getCommentsByPost(idPost);
    }
    @Get('by_user/:idUser')
    async getCommentByUser(@Param('idUser') idUser: number) {
        return await this.commentService.getCommentsByUser(idUser);
    }

    @Delete('id')
    async deleteComment(@Param('id') id:number){
        return await this.commentService.delete(id);
    }

    
}
