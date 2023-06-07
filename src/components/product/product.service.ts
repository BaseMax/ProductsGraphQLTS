import { Injectable } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
import { DeleteProductInput } from './dto/delete-product.input';
import { EditProductInput } from './dto/edit-product.input';
import { FilterProductsInput } from './dto/filter-product.input';
import ProductRepo from './product.repo';

@Injectable()
export class ProductService {
  constructor(private readonly productRepo: ProductRepo) {}

  public async createProduct(createProductInput: CreateProductInput) {
    const product = await this.productRepo.createProduct(createProductInput);
    return product;
  }

  public async editProduct(editProductInput: EditProductInput) {
    const product = await this.productRepo.editProduct(editProductInput);
    return product;
  }

  public async deleteProduct(productId: DeleteProductInput) {
    const deleteProduct = await this.productRepo.removeProduct(productId);
    return { id: deleteProduct };
  }

  public async searchProduct(name: string) {
    return await this.productRepo.textSearch(name);
  }

  public async searchProductWithFilter(filter: FilterProductsInput) {
    return await this.productRepo.findWithFilter(filter);
  }

  public async getPaginatedProducts(limit: number, page: number) {
    return await this.productRepo.paginateProducts(limit, page);
  }

  public async getProductByCategory(c_id: string) {
    return await this.productRepo.getProductByCategory(c_id);
  }
}
