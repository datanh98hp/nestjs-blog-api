import { FilterPost } from '@app/common';
import { CreatePostDto } from '@app/common/Dtos/Post/CreatePost.dto';
import { UpdatePostDto } from '@app/common/Dtos/Post/UpdatePost.dto';
import { Post } from '@app/common/Entity/Post.entity';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postRepostory: Repository<Post>
  ) {
  }
  private posts: any[] = [{
    id: 1,
    title: 'Test',
    content: "zisdhasidoisfdh "
  }];

  getHello(): string {
    return 'Hello World! - Post module';
  }

  handleTest(data) {
    console.warn(`called test of post module service with data :${JSON.stringify(data)}`);
    return this.posts;
  }

  //
  async list(query: FilterPost): Promise<any> {

    const items_per_page = Number(query.items_per_page) || 10;
    const page = Number(query.page) || 1;
    
    const skip = (page - 1) * items_per_page;

    const sortBy = query.sortBy; //'DESC' || "ASC"

    // search

    const keyword = query.keyword;

    const [res, total] = await this.postRepostory.findAndCount({
      order: {
        created_at: sortBy ? 'ASC' : "DESC"
      },
      where:[
        // title: keyword ? Like(`%${keyword}%`) : null,
        // subtitle: keyword ? Like(`%${keyword}%`) : null,
        {title: Like(`%${keyword}%`)},
        {subtitle:Like(`%${keyword}%`)},
        { slug: Like(`%${keyword}%`) },
    ],
      take: items_per_page,
      skip: skip,
      relations:{
        author:true
      },
      
      //select:[]
    });

    const lastPage = Math.ceil(total / items_per_page);

    const nextPage = page + 1 ? null : page + 1;

    const previousPage = page - 1 < 1 ? null : page - 1;

    return {
      data: res,
      total,
      currentPage: page,
      nextPage,
      previousPage,
      lastPage,
    };
  }

  async show(id):Promise<any>{
    const post = await this.postRepostory.findOneById(id);
    if (!post) {
      return {
        code:HttpStatus.NOT_FOUND,
        error:true,
        message:`Can not found item with id: ${id}`
      }
    }
    return post;
  }

  async create(post: CreatePostDto) {
    
    return await this.postRepostory.save(post);
  }

  async update(post: UpdatePostDto,id:number) {

    return await this.postRepostory.update(id,post);
  }

  async delete(id:number){
    return await this.postRepostory.delete(id);
  }
}
