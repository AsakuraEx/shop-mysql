import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDto } from './dto/order-dto';

@Controller('api/v1/orders')
export class OrderController {

    constructor(private orderService: OrderService) {}

    @Post()
    createOrder(@Body() order: OrderDto){
        return this.orderService.createOrder(order);
    }

    @Get('/pending')
    getPendingOrders(){
        return this.orderService.getPendingOrders();
    }

    @Get('/confirmed')
    getConfirmedOrders(@Query('start') start: Date, @Query('end') end: Date){

        console.log(start)
        console.log(end)

        return this.orderService.getConfirmedOrders(start, end);
    }

    @Get('/:id')
    getOrderById(@Param('id') id: string){
        return this.orderService.getOrderById(id);
    }

}
