import { NestFactory } from '@nestjs/core';
import { CategoryModule } from './category.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(CategoryModule,{
    transport:Transport.TCP,
    options:{
      host:'localhost',
      port:4011
    }
  });
  await app.listen();
}
bootstrap();
