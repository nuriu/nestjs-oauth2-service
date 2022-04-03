import { Test, TestingModule } from '@nestjs/testing';
import { OAuth2ServerService } from './oauth2-server.service';

describe('OAuth2ServerService', () => {
  let service: OAuth2ServerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OAuth2ServerService],
    }).compile();

    service = module.get<OAuth2ServerService>(OAuth2ServerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
