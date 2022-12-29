import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from '../user/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Res() response, @Body() dto: UserDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  async login(dto: UserDto) {
    return this.authService.login(dto);
  }
}
