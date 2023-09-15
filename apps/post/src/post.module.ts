
import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '@app/common/database/database.module';
import { Post } from '@app/common/Entity/Post.entity';

@Module({
  imports: [
  DatabaseModule,
    TypeOrmModule.forFeature([Post])
],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
