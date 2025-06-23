import { Body, Controller, Post } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientDto } from './dto/client-dto';

@Controller('api/v1/clients')
export class ClientController {

    constructor(private service: ClientService){}

    @Post()
    createClient(@Body() client: ClientDto){
        return this.service.createClient(client)
    }
}
