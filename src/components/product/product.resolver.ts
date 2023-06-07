import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreateProductInput } from './dto/create-product.input';
import { DeleteProductInput } from './dto/delete-product.input';
import { EditProductInput } from './dto/edit-product.input';
import { ProductService } from './product.service';

@Resolver('Product')
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Mutation('createProduct')
  async createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ) {
    return await this.productService.createProduct(createProductInput);
  }

  @Mutation('editProduct')
  async editProductInput(
    @Args('editProductInput') editProductInput: EditProductInput,
  ) {
    return await this.productService.editProduct(editProductInput);
  }

  @Mutation('deleteProduct')
  async deleteProduct(
    @Args('deleteProductInput') deleteProductInput: DeleteProductInput,
  ) {
    return await this.productService.deleteProduct(deleteProductInput);
  }

  @Query('searchProduct')
  async searchProduct(@Args('name') name: string) {
    return await this.productService.searchProduct(name);
  }

  @Query('filterProducts')
  async filterProducts(
    @Args('categoryId') categoryId: string,
    @Args('minPrice') minPrice: number,
    @Args('maxPrice') maxPrice: number,
  ) {
    return await this.productService.searchProductWithFilter({
      categoryId,
      max: maxPrice,
      min: minPrice,
    });
  }

  @Query('paginateProducts')
  async getPagincatedProducts(
    @Args('page') page: number,
    @Args('limit') limit: number,
  ) {
    return await this.productService.getPaginatedProducts(limit, page);
  }
}
