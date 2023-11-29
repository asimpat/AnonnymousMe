import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/auth/schema/user.schema';

@Schema({
  timestamps: true,
})
export class Message extends Document {
  @Prop()
  message: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: Types.ObjectId | User;
}

export const MessageSchema = SchemaFactory.createForClass(Message);


