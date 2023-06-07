import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class EditProductInput {
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
    description: 'document id',
    name: 'id',
    nullable: false,
  })
  id: string;
}
