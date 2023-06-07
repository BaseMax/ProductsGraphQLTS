import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class DeleteProductInput {
  @Field()
  productId: string;
}
