import { Comment } from '@app/common/Entity/Comment.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { async } from 'rxjs';
import { Repository } from 'typeorm';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment) private readonly commentRepository:Repository<Comment>
  ){}

  test(data) {
    console.log(data);
    return data;
  }

  async getCommentsByPost(idPost) {
    console.log(idPost);
    return await this.commentRepository.find({
     where:[
      {post:{id:idPost}}
     ],
      relations:['post']
    });
  }
}
