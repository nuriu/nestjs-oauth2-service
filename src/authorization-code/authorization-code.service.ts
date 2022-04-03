import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthorizationCode } from './authorization-code.entity';

@Injectable()
export class AuthorizationCodeService {
  constructor(
    @InjectRepository(AuthorizationCode)
    private repository: Repository<AuthorizationCode>,
  ) {}

  save(dto: Partial<AuthorizationCode>): Promise<AuthorizationCode> {
    return this.repository.save(dto);
  }

  findOne(authorizationCode: string): Promise<AuthorizationCode> {
    return this.repository.findOneOrFail(
      { authorizationCode },
      { relations: ['client', 'user'] },
    );
  }

  revoke(authorizationCode: string) {
    return this.repository.softDelete({ authorizationCode });
  }
}
