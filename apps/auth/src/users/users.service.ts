
import { RegisterDto } from '@app/common/Dtos/User/RegisterUser.dto';
import { User } from '@app/common/Entity/User.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ){}
    async findOne(email: string): Promise<User | undefined> {
        return await this.userRepository.findOneBy({email});
    }

    
}
