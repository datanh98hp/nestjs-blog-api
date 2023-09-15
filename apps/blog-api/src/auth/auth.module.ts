import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Client, ClientsModule, Transport } from '@nestjs/microservices';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports:[
    JwtModule.register({
      secretOrPrivateKey: process.env.JWT_SECRET_STRING,
      global: true,
      secret: process.env.JWT_SECRET_STRING,
      signOptions: { expiresIn: '1h' }
    }),
    ClientsModule.register([
      {
        name:'AUTH_CLIENT',
        transport:Transport.TCP,
        options:{
          host:'localhost',
          port: 4010
        }
      }
    ]),
   
  ],
  providers: [AuthService,AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
