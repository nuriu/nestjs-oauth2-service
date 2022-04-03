import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserDto } from './user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

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
