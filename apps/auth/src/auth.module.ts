import { UsersService } from './users/users.service';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';

import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constant';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '@app/common';
import { User } from '@app/common/Entity/User.entity';
import { UsersModule } from './users/users.module';
import { AuthService } from './auth.service';

@Module({
  imports: [
    UsersModule,
    DatabaseModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global:true,
      secret: process.env.JWT_SECRET_STRING,
      signOptions:{expiresIn:'1h'}
    })
  ],
  controllers: [AuthController],
  providers: [AuthService,UsersService,JwtService],
  exports: [AuthService],
})
export class AuthModule {}
