import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/schema/product.schema';

@Injectable()
class AdminRepo {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}
  async getInactiveProducts() {
    return await this.productModel.find(
      { isactive: false },
      {},
      {
        populate: {
          path: 'categoryId',
        },
        projection: {
          __v: 0,
        },
      },
    );
  }

  async activateProduct(id: string) {
    return await this.productModel.findByIdAndUpdate(
      { _id: id },
      { $set: { isactive: true } },
      {
        populate: {
          path: 'categoryId',
        },
        projection: {
          __v: 0,
        },
      },
    );
  }

  async deactivateProduct(id: string) {
    return await this.productModel.findByIdAndUpdate(
      { _id: id },
      { $set: { isactive: false } },
      {
        populate: {
          path: 'categoryId',
        },
        projection: {
          __v: 0,
        },
      },
    );
  }
}

export default AdminRepo;
