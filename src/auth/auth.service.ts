import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UsersService } from 'src/users/users.service';
import { compare } from 'src/utils/UserPasswordHashing';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async makeLogin(loginDetails: CreateAuthDto) {
    return this.userService.findOneByEmail(loginDetails.email).then((e) => {
      if (!e) {
        throw new UnauthorizedException();
      }
      if (!compare(loginDetails.password, e.password)) {
        throw new UnauthorizedException();
      }
      return {
        access_token: this.jwtService.sign({ email: e.email, id: e._id }),
      };
    });
  }
}
