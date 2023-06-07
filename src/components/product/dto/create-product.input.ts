import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateProductInput {
  @Field({
    description: 'product name',
    name: 'name',
    nullable: false,
  })
  name: string;

  @Field({
    description: 'product price',
    name: 'price',
    nullable: false,
  })
  price: number;

  @Field({
    description: 'category id',
    name: 'categoryId',
    nullable: false,
  })
  categoryId: string;
}
