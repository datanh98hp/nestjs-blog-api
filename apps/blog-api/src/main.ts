import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule,{cors:true});
  
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
  Logger.log('Blog API microservice running');
}
bootstrap();
