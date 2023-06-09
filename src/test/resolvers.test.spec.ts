import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import AuthRepo from 'src/components/auth/auth.repo';
import { AuthResolver } from 'src/components/auth/auth.resolver';
import { AuthService } from 'src/components/auth/auth.service';
import userSchema, { User } from 'src/schema/user.schema';
import { CategoryResolver } from 'src/components/category/category.resolver';
import CategoryRepo from 'src/components/category/category.repo';
import { CategoryService } from 'src/components/category/category.service';
import CategorySchema, { Category } from 'src/schema/category.schema';
describe('AuthResolver', () => {
  let authResolver: AuthResolver;
  let categoryResolver: CategoryResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/testmax', {
          serverSelectionTimeoutMS: 2000,
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
          {
            name: Category.name,
            schema: CategorySchema,
          },
        ]),
      ],
      providers: [
        AuthResolver,
        AuthService,
        AuthRepo,
        CategoryResolver,
        CategoryRepo,
        CategoryService,
      ],
    }).compile();

    authResolver = module.get<AuthResolver>(AuthResolver);
    categoryResolver = module.get<CategoryResolver>(CategoryResolver);
  });

  it('should be defined', () => {
    expect(authResolver).toBeDefined();
  });

  it('faild login', async () => {
    const login = await authResolver.login({
      email: 'mahdildmv@gmail.com',
      password: 'knkdnvidv',
    });
    expect(login).toMatchObject({
      message: 'email or password is wrong',
    });
  });

  it('register', async () => {
    // its does not matter user exists or not exists in db. if we have it then message and created fields allways will be recieved
    const r = await authResolver.register({
      email: 'azizzadeh@gmail.com',
      name: 'mahdi',
      password: '123456',
    });
    expect(r).toHaveProperty('created');
    expect(r).toHaveProperty('message');
  });

  it('success login', async () => {
    const login = await authResolver.login({
      email: 'azizzadeh@gmail.com',
      password: '123456',
    });
    expect(login).toHaveProperty('accessToken');
    expect(login).toHaveProperty('message');
  });

  let idOfTheCategory;
  it('create category', async () => {
    const c = await categoryResolver.createCategory({
      name: 'test',
      id: 'test',
    });
    idOfTheCategory = c.id;
    expect(c).toHaveProperty('id');
    expect(c).toHaveProperty('name');
  });

  it('edit category', async () => {
    const c = await categoryResolver.updateCategory({
      name: 'change',
      id: idOfTheCategory,
    });
    expect(c).toHaveProperty('id');
    expect(c).toHaveProperty('name');
  });

  it('delete category', async () => {
    const c = await categoryResolver.removeCategory({
      id: idOfTheCategory,
    });
    expect(c).toHaveProperty('id');
  });
});
