import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AtGuard } from 'src/guard/auth.guard';
import { AdminService } from './admin.service';

@Resolver('Admin')
export class AdminResolver {
  constructor(private readonly adminService: AdminService) {}

  @UseGuards(AtGuard)
  @Query('getInactiveProducts')
  async getInactiveProducts() {
    return await this.adminService.getInactiveProducts();
  }

  @UseGuards(AtGuard)
  @Mutation('activateProduct')
  async activateProduct(@Args('id') id: string) {
    return await this.adminService.activateProduct(id);
  }

  @UseGuards(AtGuard)
  @Mutation('deactivateProduct')
  async deactivateProduct(@Args('id') id: string) {
    return await this.adminService.deactivateProduct(id);
  }
}
