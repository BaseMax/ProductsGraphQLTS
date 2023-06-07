import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './components/auth/auth.module';
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
    }),
    AuthModule,
    ProductModule,
  ],
})
export class AppModule {}
