import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from './components/admin/admin.module';
import { AuthModule } from './components/auth/auth.module';
import { CategoryModule } from './components/category/category.module';
import { ProductModule } from './components/product/product.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URL, {
      serverSelectionTimeoutMS: 2000,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      typePaths: ['src/components/**/*.graphql'],
      sortSchema: true,
      context: ({ req }) => ({ req }),
    }),
    AuthModule,
    ProductModule,
    CategoryModule,
    AdminModule,
  ],
})
export class AppModule {}
