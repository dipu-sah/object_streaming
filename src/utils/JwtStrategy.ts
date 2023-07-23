import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'this is a secret',
    });
  }

  async validate(payload: Record<string, string>) {
    try {
      return this.userService.findOneByEmail(payload.email).then((e) => {
        if (!e) {
          throw new UnauthorizedException();
        }
        return e;
      });
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
