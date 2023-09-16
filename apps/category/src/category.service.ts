import { CategoryDto } from '@app/common/Dtos/Category/Category.dto';
import { Category } from '@app/common/Entity/Category.entity';
import { Injectable, HttpException, HttpCode, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

@Injectable()
export class CategoryService {

  constructor(
    @InjectRepository(Category) private readonly categoryRepository: Repository<Category>
  ) { }

  test(data: any) {
    console.log(data);

  }
  async all(query: any) {
    const keyword = query.keyword||'';
    //const status = query.status || true;
    const orderBy = query.sortBy || 'asc';
    try {
      const result = await this.categoryRepository.find({
        order: {
          id: orderBy
        },
        where: [
          { title: Like(`%${keyword}%`) }
        ]
      });
      return result;
    } catch (error) {
      throw new HttpException('Something went wrong',HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
  async create(category:CategoryDto){
    return await this.categoryRepository.save(category);
  }

  async update(category: CategoryDto,id:number) {
    return await this.categoryRepository.update(id,category);
  }

  async delete(id: number){
    return await this.categoryRepository.delete(id);
  }

}
