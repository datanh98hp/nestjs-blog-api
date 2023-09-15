import { NestFactory } from '@nestjs/core';
import { PostModule } from './post.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(PostModule,{
    transport:Transport.REDIS,
    options:{
      //host: 'redis',
      host: 'localhost',
      port: 6379,
      // password:'06021998'
    }
  });
  await app.listen();
  Logger.log('Post microservice running');
}
bootstrap();
