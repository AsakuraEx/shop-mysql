import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { ClientDto } from './dto/client-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './entity/client.entity';
import { Address } from './entity/address.entity';

@Injectable()
export class ClientService {

    constructor(
        @InjectRepository(Client) private clientRepository: Repository<Client>,
        @InjectRepository(Address) private addressRepository: Repository<Address>
    ) {}

    findClient(client: ClientDto){
        return this.clientRepository.findOne({
            where: [
                { id: client.id },
                { email: client.email }
            ]
        })
    }

    async createClient(client: ClientDto){

        const clientExist =  await this.findClient(client);

        if(clientExist){
            if(client.id){
                throw new ConflictException('El cliente con id ' + client.id + ' ya existe')
            }

            if(client.email){
                throw new ConflictException('El cliente con email ' + client.email + ' ya existe')
            }
        }

        let addressExist: Address | null = null;

        if(client.address.id){
            addressExist = await this.addressRepository.findOne({
                where: {
                    id: client.address.id
                }
            });
        }
        else{
            addressExist = await this.addressRepository.findOne({
                where: {
                    country: client.address.country,
                    province: client.address.province,
                    town: client.address.town,
                    street: client.address.street,
                }
            });
        }

        if(addressExist){
            throw new ConflictException('La dirección ya existe para este cliente')
        }

        return this.clientRepository.save(client)


    }

}
