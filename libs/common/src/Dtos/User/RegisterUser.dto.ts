import { IsEmail, IsNotEmpty } from "class-validator";

export class RegisterDto {
    id: number;
    @IsNotEmpty()
    username: string;
    @IsNotEmpty()
    password: string;
    @IsNotEmpty()
    @IsEmail()
    email: string;
 
    refresh_token: string;
   
    img: string;
    @IsNotEmpty()
    role: string;

    
}