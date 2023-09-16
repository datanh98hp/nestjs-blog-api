import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDto } from '@app/common/Dtos/Category/Category.dto';

@Controller('category')
export class CategoryController {
    constructor(
        private categoryService: CategoryService
    ) { }
    @Get('test')
    test(@Body() data: any) {
        return this.categoryService.test(data);
    }
    @Get()
    async all(@Query() query: any) {
        return await this.categoryService.all(query);
    }
    @Post()
    create(@Body() category: CategoryDto) {
        return this.categoryService.create(category)
    }

    @Post(':id')
    update(@Body() category: CategoryDto,@Param('id') id:number) {
        return this.categoryService.update(category,id);
    }
    @Delete(':id')
    delete(@Param('id') id: number){
        return this.categoryService.delete(id);
    }

}
