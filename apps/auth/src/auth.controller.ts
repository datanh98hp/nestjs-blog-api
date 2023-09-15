import { UsersService } from './users/users.service';
import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { Ctx, EventPattern, MessagePattern, Payload, RedisContext } from '@nestjs/microservices';
import { AuthService } from './auth.service';
@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
    ) {} 
  @EventPattern('test')
  async handleTest(@Payload() data: any, @Ctx() context: RedisContext) {
    console.log(data)
    //return await this.authService.test(data);
  }


  @EventPattern('login')
  async login(@Payload() data: any, @Ctx() context: RedisContext) {
    return await this.authService.login(data);
  }


  @EventPattern('register')
  async register(@Payload() data: any, @Ctx() context: RedisContext){
    return await this.authService.register(data);
  }
  @EventPattern('refresh-token')
  async refreshToken(@Payload() data: any, @Ctx() context: RedisContext){
    return await this.authService.refreshToken(data);
  }

}
