import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDto } from '@app/common/Dtos/Category/Category.dto';
import { Ctx, EventPattern, Payload, RedisContext } from '@nestjs/microservices';
import { FilterCategoryDto } from '@app/common/Dtos/Category/FilterCategory.dto';
import { UpdateCategoryDto } from '@app/common/Dtos/Category/UpdateCategory.dto';



@Controller()
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}


  @EventPattern('test')
  test(@Payload() data: any, @Ctx() context: RedisContext){
    return this.categoryService.test(data)
  }
  @EventPattern('categories')
  all(@Payload() data: any, @Ctx() context: RedisContext) {
    
    return this.categoryService.all(data);
  }
  @EventPattern('create-category')
  async createCategory(@Payload() category: CategoryDto, @Ctx() context: RedisContext){
      return await this.categoryService.create(category);
  }

  @EventPattern('update-category')
  async updateCategory(@Payload() category: UpdateCategoryDto, @Ctx() context: RedisContext){
    return await this.categoryService.update(category,category.id);
  }

  @EventPattern('delete-category')
  async delete(@Payload() id: number){
    return await this.categoryService.delete(id);
  }
}
