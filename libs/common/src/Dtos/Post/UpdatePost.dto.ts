import { User } from "@app/common/Entity/User.entity";
import { IsNotEmpty } from "class-validator";

export class UpdatePostDto {
    // id: number;
    @IsNotEmpty()
    title: string;
    @IsNotEmpty()
    subtitle: string;
    @IsNotEmpty()
    slug: string;
    @IsNotEmpty({ message: 'slug is required' })
    content: string;
   
    thumbnail:string;
    @IsNotEmpty({ message: 'author (idUser) is required' })
    author: User
}