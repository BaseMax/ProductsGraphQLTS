import { Injectable } from '@nestjs/common';
import CategoryRepo from './category.repo';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepo: CategoryRepo) {}

  public async createCategory(name: string) {
    return await this.categoryRepo.createCategory(name);
  }

  public async updateCategory(id: string, name: string) {
    return await this.categoryRepo.updateCategory(id, name);
  }

  public async deleteCategory(id: string) {
    await this.categoryRepo.removeCategory(id);
    return { id: id };
  }
}
