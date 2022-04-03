import { Body, Controller, HttpCode, Post, Req, Res } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { Request, Response } from 'express';
import {
  Request as OAuth2Request,
  Response as OAuth2Response,
} from 'oauth2-server';
import { AuthService } from 'src/auth/auth.service';
import { LoginDto } from 'src/auth/login.dto';
import { OAuth2ServerService } from './oauth2-server.service';

@Controller('oauth2')
export class OAuth2Controller {
  constructor(
    private authService: AuthService,
    private oAuth2ServerService: OAuth2ServerService,
  ) {}

  @Post('authorize')
  @HttpCode(302)
  @ApiConsumes('application/json')
  @ApiOperation({
    description: 'Authorization of a client to access user data',
    summary: 'Authorization',
    tags: ['OAuth2 Authorization'],
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        client_id: { type: 'string' },
        redirect_uri: { type: 'string' },
        grant_type: { type: 'string' },
        response_type: { type: 'string' },
        userEmail: { type: 'string' },
        userPassword: { type: 'string' },
      },
    },
  })
  async authorize(
    @Body() loginDto: LoginDto,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    const user = await this.authService.validateUser(
      loginDto.username,
      loginDto.password,
    );
    return this.oAuth2ServerService.server
      .authorize(new OAuth2Request(request), new OAuth2Response(response), {
        authenticateHandler: {
          handle() {
            return user;
          },
        },
      })
      .then(code => {
        const redirectUrl = new URL(loginDto.redirect_uri);
        redirectUrl.searchParams.append('code', code.authorizationCode);
        response.redirect(redirectUrl.toString());
      });
  }

  @Post('token')
  async token(@Req() request: Request, @Res() response: Response) {
    return this.oAuth2ServerService.server
      .token(new OAuth2Request(request), new OAuth2Response(response), {
        requireClientAuthentication: {
          authorization_code: true,
        },
      })
      .then(token => {
        response.send(token);
      });
  }
}
