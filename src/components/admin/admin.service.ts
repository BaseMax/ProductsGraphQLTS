import { Injectable } from '@nestjs/common';
import AdminRepo from './admin.repo';

@Injectable()
export class AdminService {
  constructor(private readonly adminRepo: AdminRepo) {}

  async getInactiveProducts() {
    return await this.adminRepo.getInactiveProducts();
  }

  async activateProduct(id: string) {
    return await this.adminRepo.activateProduct(id);
  }

  async deactivateProduct(id: string) {
    return await this.adminRepo.deactivateProduct(id);
  }
}
