import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'COMMENT_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 4013
        }
      }
    ])
  ],
  controllers: [CommentController],
  providers: [CommentService]
})
export class CommentModule {}
