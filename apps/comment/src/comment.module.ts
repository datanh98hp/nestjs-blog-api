import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { DatabaseModule } from '@app/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '@app/common/Entity/Category.entity';
import { Comment } from '@app/common/Entity/Comment.entity';


@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([Category,Comment])
  ],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
