import { RegisterDto } from '@app/common/Dtos/User/RegisterUser.dto';
import { Inject, Injectable, Logger, Req, RequestTimeoutException, Res, Body } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { compareSync } from 'bcrypt';
import { TimeoutError, catchError, throwError, timeout } from 'rxjs';
import { Request, Response} from 'express'
import { LoginUserDto } from '@app/common/Dtos/User/LoginUser.dto';

@Injectable()
export class AuthService {
    constructor(
        @Inject('AUTH_CLIENT') private readonly clientAuth: ClientProxy,
        private readonly jwtService: JwtService
    ) { }

    async validateUser(email: string, password: string): Promise<any> {
        try {
            const user = await this.clientAuth.send({ role: 'user', cmd: 'get' }, email).pipe(
                timeout(5000),
                catchError(err => {
                    if (err instanceof TimeoutError) {
                        return throwError(new RequestTimeoutException());
                    }
                    return throwError(err);
                })
                ,).toPromise();

            if (compareSync(password, user?.password)) {
                return user;
            }

            return null
        } catch (error) {
            Logger.log(error);
            throw error;
        }

    }

    async login(user: LoginUserDto): Promise<any>{
        
        return await this.clientAuth.send('login', user);
    }


    async register(registerUser: RegisterDto):Promise<any>{
     
        const userNew = await this.clientAuth.send('register',registerUser);
        return userNew;
        
    }
    async refreshToken(refresh_token): Promise<any>{
        // console.log(` request - ${refresh_token}`);
        const newToken = await this.clientAuth.send('refresh-token', refresh_token);
        return newToken;
    }
}
