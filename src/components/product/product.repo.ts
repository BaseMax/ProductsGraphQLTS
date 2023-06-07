import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Category } from 'src/schema/category.schema';
import { Product } from 'src/schema/product.schema';
import { CreateProductInput } from './dto/create-product.input';
import { DeleteProductInput } from './dto/delete-product.input';
import { EditProductInput } from './dto/edit-product.input';
import { FilterProductsInput } from './dto/filter-product.input';

@Injectable()
class ProductRepo {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
  ) {}

  public async createProduct(productInput: CreateProductInput) {
    const p = await this.productModel.create(productInput);
    const { categoryId, name, _id, price } = await p.populate('categoryId');

    const category = categoryId as unknown as {
      _id: Types.ObjectId;
      name: string;
    };

    return {
      id: _id,
      name: name,
      price: price,
      categoryId: {
        id: category._id,
        name: category.name,
      },
    };
  }

  public async editProduct(productInput: EditProductInput) {
    const { _id, categoryId, name, price } =
      await this.productModel.findByIdAndUpdate(
        { _id: productInput.id },
        {
          $set: {
            price: productInput.price,
            name: productInput.name,
          },
        },
        {
          returnOriginal: false,
          populate: { path: 'categoryId' },
          projection: {
            __v: 0,
          },
        },
      );

    const category = categoryId as unknown as {
      _id: Types.ObjectId;
      name: string;
    };

    return {
      id: _id,
      name: name,
      price: price,
      categoryId: {
        id: category._id,
        name: category.name,
      },
    };
  }

  public async removeProduct({ productId }: DeleteProductInput) {
    await this.productModel.deleteOne({ _id: productId });
    return productId;
  }

  public async textSearch(query: string) {
    const { categoryId, name, price, _id } = await this.productModel.findOne(
      {
        $text: { $search: query },
      },
      {},
      { populate: { path: 'categoryId' } },
    );

    const category = categoryId as unknown as {
      _id: Types.ObjectId;
      name: string;
    };

    return {
      id: _id,
      name: name,
      price: price,
      categoryId: {
        id: category._id,
        name: category.name,
      },
    };
  }

  public async findWithFilter(filter: FilterProductsInput) {
    const products = await this.productModel.find(
      {
        $and: [
          { price: { $gte: filter.min } },
          { price: { $lte: filter.max } },
          { categoryId: filter.categoryId },
        ],
      },
      {},
      { projection: { __v: 0 }, populate: { path: 'categoryId' } },
    );
    return products;
  }

  public async paginateProducts(limit: number, page: number) {
    const products = await this.productModel
      .find(
        {},
        {},
        { populate: { path: 'categoryId' }, projection: { __v: 0 } },
      )
      .limit(limit)
      .skip((page - 1) * limit);

    const productsCount = await this.productModel.find().count();

    return {
      products,
      currentPage: page,
      totalItems: productsCount,
      totalPages: parseInt(`${productsCount / limit}`),
    };
  }
}

export default ProductRepo;
