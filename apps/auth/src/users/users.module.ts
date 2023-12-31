import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { DatabaseModule } from '@app/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@app/common/Entity/User.entity';
@Module({
  imports:[
    DatabaseModule,
    TypeOrmModule.forFeature([User])
  ],
  providers: [
    UsersService
  ],
  exports:[
    UsersService
  ]
})
export class UsersModule {}
