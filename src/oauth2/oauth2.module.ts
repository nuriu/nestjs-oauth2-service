import { Module } from '@nestjs/common';
import { AccessTokenModule } from 'src/access-token/access-token.module';
import { AuthModule } from 'src/auth/auth.module';
import { AuthorizationCodeModule } from 'src/authorization-code/authorization-code.module';
import { ClientModule } from 'src/client/client.module';
import { OAuth2ServerService } from './oauth2-server.service';
import { OAuth2Controller } from './oauth2.controller';
import { OAuth2Service } from './oauth2.service';

@Module({
  imports: [
    AuthModule,
    ClientModule,
    AccessTokenModule,
    AuthorizationCodeModule,
  ],
  providers: [OAuth2ServerService, OAuth2Service],
  exports: [OAuth2ServerService],
  controllers: [OAuth2Controller],
})
export class OAuth2Module {}
