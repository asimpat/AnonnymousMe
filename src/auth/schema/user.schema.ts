import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum Roles {
  USER = 'user',
  ADMIN = 'admin',
}

@Schema({
  timestamps: true,
})
export class User extends Document {
  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop({
    default: Roles.USER
  })
  role: Roles;
}

export const UserSchema = SchemaFactory.createForClass(User);

// Define a toJSON transform to exclude the password field
UserSchema.set('toJSON', {
  transform: function (doc, ret) {
    delete ret.password;
    return ret;
  },
});
