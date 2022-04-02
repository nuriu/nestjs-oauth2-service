import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UseGuards,
} from '@nestjs/common';
import { LoginDTO } from '../models/login.dto';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { UserDto } from './user/dto/user.dto';
import { User } from './user/entities/user.entity';
import { UserService } from './user/user.service';

@Controller()
export class AppController {
  constructor(private userService: UserService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() login: LoginDTO): Promise<string> {
    if (
      login.username === undefined ||
      login.password === undefined ||
      login.username.trim().length < 1 ||
      login.password.trim().length < 1
    ) {
      throw new BadRequestException('username or password is empty');
    }

    return 'logged in';
  }

  @Post('register')
  async register(@Body() register: UserDto): Promise<User> {
    if (
      register.username === undefined ||
      register.password === undefined ||
      register.username.trim().length < 1 ||
      register.password.trim().length < 1
    ) {
      throw new BadRequestException('username or password is empty');
    }

    return await this.userService.create(
      new User({
        username: register.username.trim(),
        password: register.password.trim(),
      }),
    );
  }
}
