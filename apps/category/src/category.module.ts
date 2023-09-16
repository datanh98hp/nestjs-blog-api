import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '@app/common/Entity/Category.entity';
import { DatabaseModule } from '@app/common/database/database.module';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([Category])],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
