import { Injectable } from '@nestjs/common';
import * as OAuth2Server from 'oauth2-server';
import { tokenLifetime } from 'src/auth/constants';
import { OAuth2Service } from './oauth2.service';

@Injectable()
export class OAuth2ServerService {
  readonly server: OAuth2Server;

  constructor(private service: OAuth2Service) {
    this.server = new OAuth2Server({
      model: service,
      accessTokenLifetime: tokenLifetime,
      allowEmptyState: true,
      allowExtendedTokenAttributes: true,
    });
  }
}
