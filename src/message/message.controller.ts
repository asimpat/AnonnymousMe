import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
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

  @Get(':username')
  getUserMessages(@Param('username') username: string) {
    return this.messageService.getUserMessages(username);
  }

  @Get(':id')
  async findOneMessage(@Param('id', ParseIntPipe) id: number) {
    return await this.messageService.findOneMessage(id);
  }
}
