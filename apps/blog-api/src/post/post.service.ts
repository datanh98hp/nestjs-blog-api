import { CreatePostDto } from '@app/common/Dtos/Post/CreatePost.dto';
import { UpdatePostDto } from '@app/common/Dtos/Post/UpdatePost.dto';
import { Inject, Injectable } from '@nestjs/common';
import { CONTEXT, ClientProxy } from '@nestjs/microservices';

@Injectable()
export class PostService {

    constructor(
        @Inject('POST_SERVICE') private readonly client: ClientProxy,
        @Inject(CONTEXT) private ctx: any
    ){}


    async all(filter) {
        // await this.client.emit('posts', filter);
        return this.client.send('posts', filter);
    }

    async show(id) {
        await this.client.emit('detail-post', id);
        return this.client.send('detail-post', id);
    }

    async create(post:CreatePostDto){
        return await this.client.send('create-post', post);
    }

    async update(post: UpdatePostDto,id:number) {
        
        const data = {
            id,
            post
        }
        return await this.client.send('update-post', data);
    }

    async delete(id) {
        
        return this.client.send('delete-post', id);
    }
}
