import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { Order } from './entity/order.entity';
import { ClientService } from '../client/client.service';
import { ProductService } from '../product/product.service';
import { OrderDto } from './dto/order-dto';
import { NotFoundError } from 'rxjs';

@Injectable()
export class OrderService {

    constructor(
        @InjectRepository(Order) private orderRepository: Repository<Order>,
        private clientService: ClientService,
        private productService: ProductService
    ) {}

    async createOrder(order: OrderDto){

        if(order.client.id){

            const client = await this.clientService.getClientById(order.client.id);

            if(!client){
                throw new NotFoundException('El cliente no fue encontrado.')
            }
        }

        for (const product of order.products) {

            if(product.id){
                const p = await this.productService.getProductById(product.id)
    
                if(!p){
                    throw new NotFoundException('El producto no fue encontrado.')
                }

                if(p.deleted){
                    throw new ConflictException('El producto está eliminado, por lo que no puede agregarse')
                }
            }
        }

        return this.orderRepository.save(order);

    }

    getOrderById(id: string){
        return this.orderRepository.findOne({ 
            where: { id }
         })
    }

    getPendingOrders() {
        return this.orderRepository.find({
            where: { confirmAt: IsNull() }
        })
    }
    
    getConfirmedOrders(start: Date, end: Date) {

        if(!isNaN(start.getTime()) || !isNaN(start.getTime())){

        }else{
            return this.orderRepository.find({
                where: { confirmAt: Not(IsNull()) }
            })
        }

    }

}
