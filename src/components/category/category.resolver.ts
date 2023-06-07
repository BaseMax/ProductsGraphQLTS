import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import {
  CreateCategoryInput,
  RemoveCategoryInput,
  UpdateCategoryInput,
} from './dto/category_input';

@Resolver('Category')
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Mutation('createCategory')
  public async createCategory(
    @Args('createCategoryInput') { name }: CreateCategoryInput,
  ) {
    return await this.categoryService.createCategory(name);
  }

  @Mutation('updateCategory')
  public async updateCategory(
    @Args('updateCategoryInput') { id, name }: UpdateCategoryInput,
  ) {
    return await this.categoryService.updateCategory(id, name);
  }

  @Mutation('removeCategory')
  public async removeCategory(@Args('id') { id }: RemoveCategoryInput) {
    return await this.categoryService.deleteCategory(id);
  }
}
