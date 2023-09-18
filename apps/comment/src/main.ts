import { NestFactory } from '@nestjs/core';
import { CommentModule } from './comment.module';
import { Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(CommentModule);
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 4013,
    }
  });
  await app.startAllMicroservices()
  await app.listen(3002);
  Logger.log('Comment microservice running');
}
bootstrap();
