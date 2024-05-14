import { Module } from '@nestjs/common';
import { LoginController } from '../admin-auth/login/login.controller'
import { AdminAuthService } from './admin-auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './jwt-auth.guard';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './JWTStrategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [LoginController],
  providers: [AdminAuthService, JwtStrategy,JwtAuthGuard],
  exports: [AdminAuthService, JwtStrategy],
})
export class AdminAuthModule {}