import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "./services/auth/auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<any> {

    if (!password) {
      throw new UnauthorizedException('Please check your login credentials');
    }
    const user = await this.authService.validateUser(email, password);


    if (!user) {
      throw new UnauthorizedException('Please check your login credentials');
    }

    if (user && user.isVerified == false) {
      throw new UnauthorizedException('Please confirm your mailing address.');
    }

    if (user && user.isActive == false) {
      throw new UnauthorizedException('You account has been de-activated by site owner,Pls contact with support.');
    }

    return user;
  }
}