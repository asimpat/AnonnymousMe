import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Message } from './schema/message.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<Message>,
    private authService: AuthService,
  ) {}

  async getAll() {
    const result = await this.messageModel.find().populate('user');
    const totalMessages = await this.messageModel.countDocuments();

    return { result, totalMessages };
  }

  async sendMessage(message: string, username: string) {
    const user = await this.authService.findByUsername(username);

    if (!user) {
      throw new BadRequestException('No user exist to send message');
    }

    await this.messageModel.create({
      message: message,
      user: user._id,
    });

    return { msg: `message sent sucessfully to ${user.username}` };
  }

  async getUserMessages(username: string) {
    const user = await this.authService.findByUsername(username);

    if (!user) {
      throw new BadRequestException('user not found');
    }

    // You can omit the password field or any other sensitive information
    const userWithoutPassword = user.toJSON();
    return userWithoutPassword;
  }

  async findOneMessage(id: number) {
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new NotFoundException('Message not found');
    }
    const result = await this.messageModel
      .findById(id)
      .populate('user', 'username')
      .exec();

    return result;
  }

  async deleteMessage(id: number) {
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new NotFoundException('Message not found');
    }
    await this.messageModel.findByIdAndDelete(id);

    return { msg: 'user deleted successfully' };
  }
}
