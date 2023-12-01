import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { AdminRoleGuard } from 'src/auth/guards/isAdminRole.guard';
import { UserIsUserGuard } from 'src/auth/guards/userIsUser.guard';

@Controller('message')
export class MessageController {
  constructor(private messageService: MessageService) {}

  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  @Get('all')
  getAll() {
    return this.messageService.getAll();
  }

  // @UseGuards(UserIsUserGuard)
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
    return this.messageService.deleteMessage(id);
  }
}
