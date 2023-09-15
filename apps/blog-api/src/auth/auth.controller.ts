import { AuthService } from './auth.service';
import { Controller, Post, UseGuards, Request, Body, Res, ValidationPipe, UsePipes } from '@nestjs/common';
import { RegisterDto } from '@app/common/Dtos/User/RegisterUser.dto';
import { Response } from 'express'
import { LoginUserDto } from '@app/common/Dtos/User/LoginUser.dto';

@Controller('auth')
@UsePipes(ValidationPipe)
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }

    @Post('login')
    async login(@Body() user: LoginUserDto) {
        const result = await this.authService.login(user);
        return result;
    }

    @Post('register')
    async register(@Body() user: RegisterDto) {
        // console.log(user)
        const result = await this.authService.register(user);

        return result;
    }
    @Post('refresh-token')
    async refreshToken(@Body() { refresh_token } ):Promise<void> {
        
        return await this.authService.refreshToken(refresh_token);
    }

}
