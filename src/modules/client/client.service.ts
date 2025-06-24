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

    getClients() {
        return this.clientRepository.find();
    }

    getClientById(id: number){
        return this.clientRepository.findOne({
            where: { id }
        })
    }

    getClientByEmail(email: string){
        return this.clientRepository.findOne({
            where: { email }
        })
    }

    async updateClient(client: ClientDto) {

        //Evaluar si el objeto trae el ID
        if(!client.id){
            throw new NotFoundException('No se ha proporcionado ID, por lo que no se puede encontrar el cliente.')
        }

        //Evaluar si existe el email
        let clientExist = await this.getClientByEmail(client.email)

        //Si existe, pero ya esta asociado a otro usuario, error por ser unico
        if(clientExist && clientExist.id != client.id){
            throw new ConflictException("El cliente con el mail "+ client.email + " ya existe");
        }

        let addressExist: Address | null = null;
        let deleteAddress = false;

        //Evaluar si viene el id de la dirección
        if(client.address.id){
            //Encuentra la coincidencia de id
            addressExist = await this.addressRepository.findOne({
                where: { id: client.address.id }
            })

            //Busca si existe un cliente asociado al id proporcionado
            clientExist = await this.getClientById(client.id);

            // Si existe una dirección y un cliente, evalua si el id de la dirección del cliente es diferente a la de la dirección
            // Para encontrar conflicto de relación 1 a 1
            if(addressExist && clientExist && addressExist.id != clientExist.address.id){
                throw new ConflictException("La dirección ya esta asociada a otro usuario, la relación es de 1:1");
            }

            //Buscamos una nueva dirección que tenga exactamente todos los campos
            addressExist = await this.addressRepository.findOne({
                where: {
                    country: client.address.country,
                    province: client.address.province,
                    town: client.address.town,
                    street: client.address.street,
                }
            })

            // Si existe y no esta asociada al cliente, entonces lanza error
            if(addressExist && clientExist && addressExist.id != clientExist.address.id){
                throw new ConflictException("La dirección ya esta asociada a otro usuario, la relación es de 1:1 2da validacion");
            }

        }
        //Ya validamos que los ID no concuerdan, ahora hay que validar todo el objeto sin id
        else {

            // Si no trae un id, valida por todos los demas campos que el registro exista
            addressExist = await this.addressRepository.findOne({
                where: {
                    country: client.address.country,
                    province: client.address.province,
                    town: client.address.town,
                    street: client.address.street,
                }
            })

            clientExist = await this.getClientById(client.id)

            // Si existe y no esta asociada al cliente, entonces lanza error
            if(addressExist && clientExist && addressExist.id != clientExist.address.id){
                throw new ConflictException("La dirección ya esta asociada a otro usuario, 3ra validacion")
            }

            deleteAddress = true;
        }

        const updateClient = await this.clientRepository.save(client)

        if(deleteAddress){
            await this.addressRepository.delete({ id: clientExist?.address.id })
        }

        return updateClient;
    }

    async deleteClient(id: number){

        const clientExist = await this.getClientById(id);

        if(!clientExist){
            throw new NotFoundException("El cliente no fue encontrado");
        }

        const rows = await this.clientRepository.delete({ id });

        if(rows.affected == 1){

            await this.addressRepository.delete({ id: clientExist.address.id })
            return true;

        }

        return false;

    }

}
