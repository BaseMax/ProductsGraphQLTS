import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import productSchema, { Product } from 'src/schema/product.schema';
import ProductRepo from './product.repo';
import CategorySchema, { Category } from 'src/schema/category.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Product.name,
        schema: productSchema,
      },
      {
        name: Category.name,
        schema: CategorySchema,
      },
    ]),
  ],
  providers: [ProductResolver, ProductService, ProductRepo],
})
export class ProductModule {}
