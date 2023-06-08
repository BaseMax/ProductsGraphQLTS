import { CreateAdminInput } from './create-admin.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateAdminInput extends PartialType(CreateAdminInput) {
  id: number;
}
