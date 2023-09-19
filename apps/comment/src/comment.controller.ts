
import { Controller, Get } from '@nestjs/common';
import { CommentService } from './comment.service';
import { Ctx, EventPattern, Payload, RedisContext } from '@nestjs/microservices';

@Controller()
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @EventPattern('test')
  async getHello(@Payload() data: any, @Ctx() context: RedisContext) {
    return await this.commentService.test(data);
  }

  @EventPattern('get-comments')
  async getCommentByPost(@Payload() idPost: number, @Ctx() context: RedisContext){
    return await this.commentService.getCommentsByPost(idPost);
  }

  @EventPattern('delete-comments')
  async deleteComment(@Payload() id: number){
    return await this.commentService.delete(id);
  }

  @EventPattern('get-comments-by-user')
  async getCommentByUser(@Payload() id: number){
    return await this.commentService.getCommentsByUser(id);
  }

}
