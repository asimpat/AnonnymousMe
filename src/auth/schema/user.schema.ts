import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Message } from 'src/message/schema/message.schema';

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
    default: Roles.USER,
  })
  role: Roles;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Message' }] })
  messages: Types.ObjectId[] | Message[];
}

export const UserSchema = SchemaFactory.createForClass(User);

// Define a toJSON transform to exclude the password field
UserSchema.set('toJSON', {
  transform: function (doc, ret) {
    delete ret.password;
    return ret;
  },
});
