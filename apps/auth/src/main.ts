import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      //host: 'redis',
      host: 'localhost',
      port: 4010,
      // password:'06021998'
    }
  });
  await app.startAllMicroservices();
  await app.listen(3001);
  Logger.log('Auth microservice running');
}
bootstrap();
