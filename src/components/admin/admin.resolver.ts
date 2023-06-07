import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AdminService } from './admin.service';

@Resolver('Admin')
export class AdminResolver {
  constructor(private readonly adminService: AdminService) {}

  @Query('getInactiveProducts')
  async getInactiveProducts() {
    return await this.adminService.getInactiveProducts();
  }

  @Mutation('activateProduct')
  async activateProduct(@Args('id') id: string) {
    return await this.adminService.activateProduct(id);
  }

  @Mutation('deactivateProduct')
  async deactivateProduct(@Args('id') id: string) {
    return await this.adminService.deactivateProduct(id);
  }
}
