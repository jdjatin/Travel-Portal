import { Controller, Post, Body } from '@nestjs/common';
import { AdminAuthService } from '../admin-auth.service';
import { AdminLoginDto } from '../dto/login.Dto';

@Controller('admin-auth')
export class LoginController {
  constructor(private readonly authService: AdminAuthService) {}

  @Post('login')
  async login(@Body() body: AdminLoginDto){
    const { username, password } = body;
    const token = await this.authService.login(body);
    return { 'access_token': token };
  }
  
}