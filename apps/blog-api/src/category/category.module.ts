import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports:[
    ClientsModule.register([
      { 
        name:'CATEGORY_SERVICE',
        transport:Transport.TCP,
        options:{
          host: 'localhost',
          port: 4011
        }
      }
    ])
  ],
  controllers: [CategoryController],
  providers: [CategoryService]
})
export class CategoryModule {}
