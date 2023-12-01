import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from './dto/user.dto';
import { UserRegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from './guards/jwt.guard';
import { AdminRoleGuard } from './guards/isAdminRole.guard';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  registerUser(@Body() register: UserRegisterDto) {
    return this.authService.registerUser(register);
  }

  @Get('login')
  loginUser(@Body() user: UserDto) {
    return this.authService.loginUser(user);
  }

  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  @Get('users')
  getUsers() {
    return this.authService.getAllUsers();
  }
}
