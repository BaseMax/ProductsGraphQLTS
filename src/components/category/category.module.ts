import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryResolver } from './category.resolver';
import CategoryRepo from './category.repo';
import { MongooseModule } from '@nestjs/mongoose';
import CategorySchema, { Category } from 'src/schema/category.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Category.name,
        schema: CategorySchema,
      },
    ]),
  ],
  providers: [CategoryResolver, CategoryService, CategoryRepo],
})
export class CategoryModule {}
