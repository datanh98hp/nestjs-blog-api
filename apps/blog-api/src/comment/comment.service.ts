import { Inject, Injectable } from '@nestjs/common';
import { CONTEXT, ClientProxy } from '@nestjs/microservices';

@Injectable()
export class CommentService {
    constructor(
        @Inject('COMMENT_SERVICE') private readonly client: ClientProxy,
        @Inject(CONTEXT) private ctx: any
    ){  
    }

    async test(data){
        console.log(data)
       return await this.client.send('test', data);
    }

    async getCommentsByPost(idPost){
        return await this.client.send('get-comments',idPost);
    }
    async getCommentsByUser(idUser) {
        return await this.client.send('get-comments-by-user', idUser);
    }
    async delete(id: number) {
        console.log(id)
        return await this.client.send('delete-comments', id);
    }

}
