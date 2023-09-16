import { CategoryDto } from '@app/common/Dtos/Category/Category.dto';
import { FilterCategoryDto } from '@app/common/Dtos/Category/FilterCategory.dto';
import { Inject, Injectable } from '@nestjs/common';
import { CONTEXT, ClientProxy } from '@nestjs/microservices';

@Injectable()
export class CategoryService {
    constructor(
        @Inject('CATEGORY_SERVICE') private readonly client: ClientProxy,
        @Inject(CONTEXT) private ctx: any
    ) { }

    async test(data: any) {
        return await this.client.send('test', data);
    }

    async all(query: FilterCategoryDto) {
        return await this.client.send('categories', query);
    }

    async create(category: CategoryDto) {
        return await this.client.send('create-category', category);
    }

    async update(category: CategoryDto,id:number) {
        return await this.client.send('update-category', {
            id,
            ...category
        });
    }
    async delete(id:number){
        return await this.client.send('delete-category', id);
    }
    
}
