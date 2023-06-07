import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FilterProductsInput {
  @Field({
    description: 'min product price',
    name: 'min',
    nullable: false,
  })
  min: number;

  @Field({
    description: 'max product price',
    name: 'max',
    nullable: false,
  })
  max: number;

  @Field({
    description: 'category id',
    name: 'categoryId',
    nullable: false,
  })
  categoryId: string;
}
