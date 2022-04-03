import { Injectable, UnauthorizedException } from '@nestjs/common';
import OAuth2Server, {
  AuthorizationCode,
  AuthorizationCodeModel,
  Client as OAuthClient,
  ClientCredentialsModel,
  Token,
  User as OAuthUser,
} from 'oauth2-server';
import { AccessToken } from 'src/access-token/access-token.entity';
import { AccessTokenService } from 'src/access-token/access-token.service';
import { AuthService } from 'src/auth/auth.service';
import { AuthorizationCodeService } from 'src/authorization-code/authorization-code.service';
import { Client } from 'src/client/client.entity';
import { ClientService } from 'src/client/client.service';
import { User } from 'src/user/user.entity';

@Injectable()
export class OAuth2Service
  implements AuthorizationCodeModel, ClientCredentialsModel
{
  constructor(
    private authService: AuthService,
    private clientService: ClientService,
    private accessTokenService: AccessTokenService,
    private authorizationCodeService: AuthorizationCodeService,
  ) {}

  getClient(clientId: string, clientSecret: string) {
    return this.clientService.getClient(clientId, clientSecret).catch(err => {
      throw new UnauthorizedException();
    });
  }

  saveToken(token: Token, client: Client, user: User) {
    return this.accessTokenService.save({
      accessToken: token.accessToken,
      expiresAt: token.accessTokenExpiresAt,
      client: Object.assign(new Client(), { id: client.id }),
      user: Object.assign(new User(), { id: user.id }),
    });
  }

  getAccessToken(token: string) {
    return this.accessTokenService.findOne(token);
  }

  generateAccessToken(
    client: OAuthClient,
    user: OAuth2Server.User,
    scope: string | string[],
  ): Promise<string> {
    return Promise.resolve(this.authService.signPayload({ ...user, scope }));
  }

  getRefreshToken(token) {
    return new Promise(resolve => resolve(''));
  }

  revokeToken(token: AccessToken) {
    return this.accessTokenService.revoke(token.accessToken).then(res => !!res);
  }

  saveAuthorizationCode(
    code: Pick<
      AuthorizationCode,
      'authorizationCode' | 'expiresAt' | 'redirectUri' | 'scope'
    >,
    client: OAuthClient,
    user: OAuthUser,
  ) {
    return this.authorizationCodeService
      .save({
        authorizationCode: code.authorizationCode,
        expiresAt: code.expiresAt,
        redirectUri: code.redirectUri,
        client: Object.assign(new Client(), { id: client.id }),
        user: Object.assign(new User(), { id: user.id }),
      })
      .then(code => {
        return code;
      });
  }

  getAuthorizationCode(authorizationCode) {
    return this.authorizationCodeService
      .findOne(authorizationCode)
      .then(code => {
        delete code.redirectUri;
        return code;
      });
  }

  revokeAuthorizationCode(authorizationCode: AuthorizationCode) {
    return this.authorizationCodeService
      .revoke(authorizationCode.authorizationCode)
      .then(res => !!res);
  }

  verifyScope(token, scope) {
    return Promise.resolve(true);
  }

  getUserFromClient() {
    return Promise.resolve({});
  }
}
