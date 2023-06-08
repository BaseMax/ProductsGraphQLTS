import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocuement = HydratedDocument<User>;

export interface IuserSchema {
  email: string;
  password: string;
  name: string;
}

export interface IuserAdminSchema extends IuserSchema {
  isadmin: boolean;
}

@Schema()
export class User {
  @Prop({
    type: String,
    required: true,
  })
  name: string;

  @Prop({
    type: String,
    required: true,
  })
  email: string;

  @Prop({
    type: String,
    required: true,
  })
  password: string;

  @Prop({
    type: Boolean,
    required: false,
    default: false,
  })
  isadmin: string;
}

const userSchema = SchemaFactory.createForClass(User);

export default userSchema;
