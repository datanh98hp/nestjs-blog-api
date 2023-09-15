import { User } from "@app/common/Entity/User.entity";
import { IsNotEmpty } from "class-validator";

export class CreatePostDto {

    @IsNotEmpty()
    title: string;
    @IsNotEmpty()
    subtitle: string;
    @IsNotEmpty()
    slug: string;
    @IsNotEmpty()
    content: string;
    
    thumbnail: string;
    @IsNotEmpty()
    author: User
}