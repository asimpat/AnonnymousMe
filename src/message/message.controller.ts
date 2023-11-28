import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController {
  constructor(private messageService: MessageService) {}

  @Get('all')
  getAll() {
    return this.messageService.getAll();
  }

  @Post('/add/:username')
  sendMessage(
    @Body('message') message: string,
    @Param('username') username: string,
  ) {
    return this.messageService.sendMessage(message, username);
  }
}
