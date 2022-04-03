import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './client.entity';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client) private repository: Repository<Client>,
  ) {}

  getClient(clientId: string, clientSecret?: string): Promise<Client> {
    if (clientSecret == null) {
      return this.repository.findOneOrFail({
        clientId,
      });
    }

    return this.repository.findOneOrFail({
      clientId,
      clientSecret,
    });
  }

  save(client: Client): Promise<Client> {
    return this.repository.save(client);
  }
}
