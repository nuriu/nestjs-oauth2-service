import { Body, Controller, Post } from '@nestjs/common';
import { ClientService } from './client.service';
import { Client } from './client.entity';

@Controller('client')
export class ClientController {
  constructor(private clientService: ClientService) {}

  @Post()
  create(@Body() client: Client) {
    return this.clientService.save(client);
  }
}
