import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccessToken } from './access-token.entity';

@Injectable()
export class AccessTokenService {
  constructor(
    @InjectRepository(AccessToken)
    private repository: Repository<AccessToken>,
  ) {}

  save(dto: Partial<AccessToken>): Promise<AccessToken> {
    return this.repository.save(dto);
  }

  findOne(accessToken: string): Promise<AccessToken> {
    return this.repository.findOneOrFail({
      accessToken,
    });
  }

  revoke(accessToken: string) {
    return this.repository.softDelete({
      accessToken,
    });
  }
}
