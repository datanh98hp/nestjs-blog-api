import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PostController } from './post/post.controller';
import { PostService } from './post/post.service';
import { PostModule } from './post/post.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './auth/auth.service';
import { CategoryModule } from './category/category.module';


@Module({
  imports: [
    ConfigModule.forRoot(
      {
        isGlobal: true,
      }
    ),
    PostModule,
    AuthModule,
    ClientsModule.register([
      /// POST_SERVICE
      {
        name: 'POST_SERVICE',
        transport: Transport.REDIS,
        options:{
          host: 'localhost',
          // host:'redis',
          port:6379
        }
      },
      // {
      //   name: 'USER_CLIENT',
      //   transport: Transport.TCP,
      //   options: {
      //     // host:'localhost',
      //     port: 4010
      //   }
      // }
      /// OTHER_SERVICE
    
    ]),
    CategoryModule,

  ],
  controllers: [AppController, PostController],
  providers: [AppService, PostService],
})
export class AppModule {}
