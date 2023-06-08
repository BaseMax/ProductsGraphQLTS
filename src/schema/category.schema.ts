import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CategoryDocuement = HydratedDocument<Category>;

@Schema()
export class Category {
  @Prop({
    type: String,
    required: true,
  })
  name: string;
}

const CategorySchema = SchemaFactory.createForClass(Category);

export default CategorySchema;
