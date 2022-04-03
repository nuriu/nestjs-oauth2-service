import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { LoginDto } from './auth/dto/login.dto';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { UserDto } from './user/dto/user.dto';
import { User } from './user/entities/user.entity';
import { UserService } from './user/user.service';

@Controller()
export class AppController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() login: LoginDto) {
    if (
      login.username === undefined ||
      login.password === undefined ||
      login.username.trim().length < 1 ||
      login.password.trim().length < 1
    ) {
      throw new BadRequestException('username or password is empty');
    }

    return this.authService.login(login.username, login.password);
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

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
