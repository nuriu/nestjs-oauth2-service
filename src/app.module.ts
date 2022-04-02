import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { HealthController } from './health/health.controller';
import { UserModule } from './user/user.module';
import * as ormconfig from '../ormconfig';

@Module({
  imports: [
    HttpModule,
    TerminusModule,
    TypeOrmModule.forRoot(ormconfig),
    UserModule,
  ],
  controllers: [AppController, HealthController],
  providers: [],
})
export class AppModule {}
