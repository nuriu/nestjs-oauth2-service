import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessTokenModule } from './access-token/access-token.module';
import { AuthModule } from './auth/auth.module';
import { AuthorizationCodeModule } from './authorization-code/authorization-code.module';
import { ClientModule } from './client/client.module';
import { HealthController } from './health/health.controller';
import { OAuth2Module } from './oauth2/oauth2.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    HttpModule,
    TerminusModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        migrations: [__dirname + '/migrations/*{.ts,.js}'],
        synchronize: false,
        cli: {
          migrationsDir: __dirname + '/migrations',
        },
        migrationsRun: true,
        logging: true,
        logger: 'file',
      }),
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
    ClientModule,
    AccessTokenModule,
    AuthorizationCodeModule,
    OAuth2Module,
  ],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
