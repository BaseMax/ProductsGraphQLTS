import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminResolver } from './admin.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import productSchema, { Product } from 'src/schema/product.schema';
import AdminRepo from './admin.repo';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Product.name,
        schema: productSchema,
      },
    ]),
  ],
  providers: [AdminResolver, AdminService, AdminRepo],
})
export class AdminModule {}
