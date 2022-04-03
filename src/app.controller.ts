import {
  BadRequestException,
  Body,
  Controller,
  Headers,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { jwtConstants } from './auth/constants';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { UserDto } from './user/user.dto';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Res() res,
    @Headers() headers: Headers,
    @Body() userDto: UserDto,
  ) {
    if (
      userDto.username === undefined ||
      userDto.password === undefined ||
      userDto.username.trim().length < 1 ||
      userDto.password.trim().length < 1
    ) {
      throw new BadRequestException('username or password is empty');
    }
    const response_type = headers['response_type'];
    const redirect_uri = headers['redirect_uri'];

    if (response_type === 'implicit') {
      const token = (
        await this.authService.login(userDto.username, userDto.password)
      ).access_token;

      return res.redirect(
        `${redirect_uri}#access_token=${token}&expires_in=${jwtConstants.expiresIn}&token_type=Bearer`,
      );
    } else if (response_type === 'code') {
      const client_id = headers['client_id'];
      const authorizationCode = Buffer.from(client_id, 'base64').toString(
        'binary',
      );

      return res.redirect(`${redirect_uri}?code=${authorizationCode}`);
    } else {
      throw new BadRequestException(
        'response_type should be either "implicit" or "code"',
      );
    }
  }
}
