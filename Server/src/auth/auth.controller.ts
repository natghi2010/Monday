import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from '../user/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Res() response, @Body() dto: UserDto) {
    return await this.authService.register(response, dto);
  }

  @Post('login')
  async login(@Res() response, @Body() dto: UserDto) {
    return this.authService.login(response, dto);
  }

  @Get('logout')
  async logout(@Res() response, @Req() request) {
    const header = request.headers['authorization'];
    return await this.authService.logout(response, header);
  }
}
