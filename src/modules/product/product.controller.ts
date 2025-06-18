import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { ProductDto } from './dto/product.dto';

@Controller('api/v1/products')
@ApiTags('Productos')
export class ProductController {

    constructor(private ProductService: ProductService) {}
    

    @Post()
    createProduct(@Body() product: ProductDto){
        return this.ProductService.createProduct(product);
    }

    @Get('/:id')
    getProductById(@Param('id') id: number) {
        return this.ProductService.getProductById(id);
    }

}
