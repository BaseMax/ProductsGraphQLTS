import { Field, InputType } from '@nestjs/graphql';

abstract class CategoryInput {
  @Field()
  id: string;
}

@InputType()
export class CreateCategoryInput extends CategoryInput {
  @Field()
  name: string;
}

@InputType()
export class UpdateCategoryInput extends CreateCategoryInput {}

@InputType()
export class RemoveCategoryInput extends CategoryInput {}
