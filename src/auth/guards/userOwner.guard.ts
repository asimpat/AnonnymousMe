import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { MessageService } from 'src/message/message.service';

@Injectable()
export class UserOwnerGuard implements CanActivate {
  constructor(private messageService: MessageService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const message = await this.messageService.findOneMessage(request.params.id);

    if (request.user.userId === message.user.id) return true;

    return false;
  }
}
