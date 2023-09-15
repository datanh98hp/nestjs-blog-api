import { Controller, Get, Logger, UseInterceptors } from '@nestjs/common';
import { PostService } from './post.service';
import { Ctx, EventPattern, Payload, RedisContext } from '@nestjs/microservices';
import { CreatePostDto } from '@app/common/Dtos/Post/CreatePost.dto';
import { UpdatePostDto } from '@app/common/Dtos/Post/UpdatePost.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { storeConfig } from '@app/common/config/store.config';
import { extname } from 'path';

@Controller()
export class PostController {
  constructor(private readonly postService: PostService) { }

  @Get()
  getHello(): string {
    return this.postService.getHello();
  }

  @EventPattern('test')
  async handleTest(@Payload() data: any, @Ctx() context: RedisContext) {
    console.log(data)
    return await this.postService.handleTest(data);
  }

  @EventPattern('posts') // iclude filter data
  async all(@Payload() data: any, @Ctx() context: RedisContext) {
    return this.postService.list(data);
  }


  @EventPattern('latest-posts')
  async getLatestPost() {
    ///
  }
  @EventPattern('detail-post')
  async show(@Payload() id: number, @Ctx() context: RedisContext) {
    return await this.postService.show(id);
  }

  @EventPattern('create-post')
  async create(@Payload() post: CreatePostDto, @Ctx() context: RedisContext) {
    console.log(post);
    return await this.postService.create(post);
  }

  @EventPattern('update-post')
  async update(@Payload() data: any, @Ctx() context: RedisContext) {
    Logger.log(`=====Update post: ${data.id}====`)
    return await this.postService.update(data.post, data.id);
  }

  @EventPattern('delete-post')
  async delete(@Payload() id: number, @Ctx() context: RedisContext) {
    Logger.log(`=====Delete post: ${id}====`)
    return await this.postService.delete(id)
  }
}
