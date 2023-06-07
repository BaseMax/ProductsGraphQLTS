import { Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocuement = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop({
    type: String,
    required: true,
  })
  name: string;

  @Prop({
    type: Number,
    required: true,
  })
  price: number;

  @Prop({
    type: Types.ObjectId,
    ref: 'Category',
  })
  categoryId: Types.ObjectId;
}

const productSchema = SchemaFactory.createForClass(Product);

productSchema.index({
  name: 'text',
});

export default productSchema;
