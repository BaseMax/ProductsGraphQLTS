import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from 'src/schema/category.schema';

@Injectable()
class CategoryRepo {
  constructor(
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
  ) {}
  name;

  public async createCategory(name: string) {
    const c = await this.categoryModel.create({ name });
    return {
      id: c._id,
      name: c.name,
    };
  }

  public async updateCategory(c_id: string, name: string) {
    const c = await this.categoryModel.findByIdAndUpdate(
      { _id: c_id },
      { $set: { name } },
      {
        returnOriginal: false,
      },
    );
    return {
      id: c._id,
      name: c.name,
    };
  }

  public async removeCategory(c_id: string) {
    await this.categoryModel.deleteOne({ _id: c_id });
    return {
      c_id,
    };
  }
}

export default CategoryRepo;
