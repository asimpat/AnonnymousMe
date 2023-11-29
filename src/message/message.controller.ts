import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
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

  @Get('/find/:id')
   findOneMessage(@Param('id') id: number) {
    return this.messageService.findOneMessage(id);
  }

  @Delete('/delete/:id')
  deleteMesaage(@Param('id') id: number) {
    return this.messageService.deleteMessage(id)
  }

}
