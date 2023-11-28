import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from './dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  registerUser(@Body() register: UserDto) {
    return this.authService.registerUser(register);
  }

  @Get('login')
  loginUser(@Body() user: UserDto) {
    return this.authService.loginUser(user);
  }
}
