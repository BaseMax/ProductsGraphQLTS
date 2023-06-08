import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminResolver } from './admin.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import productSchema, { Product } from 'src/schema/product.schema';
import AdminRepo from './admin.repo';
import { JwtModule } from '@nestjs/jwt';
import userSchema, { User } from 'src/schema/user.schema';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRETKEY,
      signOptions: { expiresIn: '1000s' },
    }),
    MongooseModule.forFeature([
      {
        name: Product.name,
        schema: productSchema,
      },
      {
        name: User.name,
        schema: userSchema,
      },
    ]),
  ],
  providers: [AdminResolver, AdminService, AdminRepo],
})

export class AdminModule {}
