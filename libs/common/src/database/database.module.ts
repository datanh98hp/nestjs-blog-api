import { User } from './../Entity/User.entity';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '../Entity/Post.entity';

@Module({
    imports:[
        ConfigModule.forRoot({
            isGlobal:true
        }),
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: process.env.MYSQL_HOST,
            port: +process.env.MYSQL_PORT,
            username: process.env.MYSQL_USERNAME,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
            entities: [Post,User],
            synchronize: true
        })
    ]
})
export class DatabaseModule {}
