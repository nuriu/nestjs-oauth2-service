import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.userService.getOneByUsername(username);
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) return user;
    }

    throw new UnauthorizedException();
  }

  async login(username: string, password: string) {
    const user = await this.validateUser(username, password);

    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.signPayload(payload),
    };
  }

  signPayload(payload: string | object | Buffer): string {
    return this.jwtService.sign(payload);
  }
}
