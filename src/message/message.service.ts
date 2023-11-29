import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Message } from './schema/message.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/auth/schema/user.schema';
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

    const createMessage = await this.messageModel.create({
      message: message,
      user: user._id,
    });

    return createMessage;
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
    const result = await this.messageModel.findById(id);

    if (!result) {
      throw new NotFoundException('Message not found');
    }

    return result;
  }
}
