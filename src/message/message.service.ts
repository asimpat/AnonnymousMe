import { BadRequestException, Injectable } from '@nestjs/common';
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
}
