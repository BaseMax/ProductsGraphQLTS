import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import userSchema, { User } from 'src/schema/user.schema';
import AuthRepo from './auth.repo';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

describe('AuthResolver', () => {
  let resolver: AuthResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/testmax', {
          serverSelectionTimeoutMS: 2000,
        }),
        GraphQLModule.forRoot<ApolloDriverConfig>({
          driver: ApolloDriver,
          playground: true,
          typePaths: ['src/components/**/*.graphql'],
          sortSchema: true,
          context: ({ req }) => ({ req }),
        }),
        JwtModule.register({
          global: true,
          secret: 'test key',
          signOptions: { expiresIn: '1000s' },
        }),
        MongooseModule.forFeature([
          {
            name: User.name,
            schema: userSchema,
          },
        ]),
      ],
      providers: [AuthResolver, AuthService, AuthRepo],
    }).compile();

    resolver = module.get<AuthResolver>(AuthResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('faild login', async () => {
    const login = await resolver.login({
      email: 'mahdildmv@gmail.com',
      password: 'knkdnvidv',
    });
    expect(login).toMatchObject({
      message: 'email or password is wrong',
    });
  });

  it('success register', async () => {
    const r = await resolver.register({
      email: 'azizzadeh@gmail.com',
      name: 'mahdi',
      password: '123456',
    });
    expect(r).toHaveProperty('created');
    expect(r).toHaveProperty('message');
  });

  it('success login', async () => {
    const login = await resolver.login({
      email: 'azizzadeh@gmail.com',
      password: '123456',
    });
    expect(login).toHaveProperty('accessToken');
    expect(login).toHaveProperty('message');
  });
});
