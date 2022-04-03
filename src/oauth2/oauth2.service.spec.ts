import { Test, TestingModule } from '@nestjs/testing';
import { OAuth2Service } from './oauth2.service';

describe('Oauth2Service', () => {
  let service: OAuth2Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OAuth2Service],
    }).compile();

    service = module.get<OAuth2Service>(OAuth2Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
