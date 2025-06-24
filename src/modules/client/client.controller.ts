import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientDto } from './dto/client-dto';

@Controller('api/v1/clients')
export class ClientController {

    constructor(private service: ClientService){}

    @Post()
    createClient(@Body() client: ClientDto){
        return this.service.createClient(client)
    }

    @Get()
    getClients(){
        return this.service.getClients();
    }

    @Get('/:id')
    getClientById(@Param('id') id: number){
        return this.service.getClientById(id)
    }

    @Put()
    updateClient(@Body() client: ClientDto){
        return this.service.updateClient(client);
    }

    @Delete('/:id')
    deleteClient(@Param('id') id: number){
       return this.service.deleteClient(id); 
    }
}
