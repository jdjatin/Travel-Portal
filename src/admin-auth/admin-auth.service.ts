import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminLoginDto } from './dto/login.Dto';
// import { LoginDto } from 'src/auth/dto/login.dto';

@Injectable()
export class AdminAuthService {
  constructor(private readonly jwtService: JwtService) {}

  async validateUser(username: string, password: string): Promise<any> {
    // You can validate the username and password against a database or any other data store
    if (username === 'admin' && password === 'admin123') {
      return { username: 'admin' };
    }
    return null;
  }

  async login(loginDto: AdminLoginDto) {
    const user = await this.validateUser(loginDto.username, loginDto.password);
    if (!user) {
      return { message: 'Invalid credentials' };
    }
    const payload = { username: user.username };
    const token = this.jwtService.sign(payload);
    return { access_token: token };
  }
}