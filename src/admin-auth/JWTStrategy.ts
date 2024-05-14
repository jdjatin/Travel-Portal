import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AdminAuthService } from './admin-auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          ignoreExpiration: true,
          secretOrKey: process.env.JWT_SECRET,
        });
      }
    
      async validate(payload) {
        return payload;
      }
}
