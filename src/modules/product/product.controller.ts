import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { ProductDto } from './dto/product.dto';
import { StockDto } from './dto/stock.dto';

@Controller('api/v1/products')
@ApiTags('Productos')
export class ProductController {

    constructor(private ProductService: ProductService) {}

    @Post()
    @ApiOperation({description: 'Crea un producto'})
    @ApiBody({ 
        description: 'Crea un producto mediante un ProductDto',
        type: ProductDto,
        examples: {
            ejemplo1: {
                value: {
                    "id": 5,
                    "name": "Product 5",
                    "price": 100,
                    "stock": 220,
                    "deleted": false
                }
            },
            ejemplo2: {
                value: {
                    "name": "Product 5",
                    "price": 100,
                    "stock": 220,
                    "deleted": false
                }
            }
        }
        
    })
    @ApiResponse({
        status: 201,
        description: 'El producto se ha creado correctamente'
    })
    createProduct(@Body() product: ProductDto){
        return this.ProductService.createProduct(product);
    }
    
    @Get()
    @ApiOperation({description: 'Obtiene todos los productos'})
    @ApiResponse({
        status: 200,
        description: 'Devuelve la información solicitada'
    })
    getProducts(){
        return this.ProductService.findAll();
    }
    
    @Put()
    @ApiOperation({description: 'Actualiza un producto especifico'})
    @ApiBody({
        description: 'Actualiza un producto mediante un ProductDto',
        type: ProductDto,
        examples: {
            ejemplo1: {
                value: {
                    "id": 5,
                    "name": "Product 5",
                    "price": 150,
                    "stock": 220,
                    "deleted": false
                }
            },
        }
        
    })
    @ApiResponse({
        status: 200,
        description: 'Actualiza la información solicitada'
    })
    @ApiResponse({
        status: 409,
        description: 'Existe un conflicto y no pudo actualizar'
    })
    updateProduct(@Body() product: ProductDto){
        return this.ProductService.updateProduct(product);
    }

    @Get('/deleted')
    @ApiOperation({description: 'Obtiene todos los productos eliminados'})
    @ApiResponse({
        status: 200,
        description: 'Devuelve la información solicitada'
    })
    getProductsDeleted(){
        return this.ProductService.findAllDeleted();
    }

    @Get('/:id')
    @ApiOperation({description: 'Obtiene todos los productos por el id proporcionado'})
    @ApiParam({name: 'id', type: Number, required: true, description: 'identificador del producto'})
    @ApiResponse({
        status: 200,
        description: 'Devuelve la información solicitada'
    })
    getProductById(@Param('id') id: number) {
        return this.ProductService.getProductById(id);
    }
    
    @Delete('/:id')
    @ApiOperation({description: 'Elimina un producto por el id proporcionado'})
    @ApiParam({name: 'id', type: Number, required: true, description: 'identificador del producto'})
    @ApiResponse({
        status: 200,
        description: 'Devuelve la información solicitada'
    })
    deleteProduct(@Param('id') id: number){
        return this.ProductService.deleteProduct(id);
    }
    
    @Patch('/restore/:id')
    @ApiOperation({description: 'Restaura un producto que fue eliminado, mediante su ID'})
    @ApiParam({name: 'id', type: Number, required: true, description: 'identificador del producto'})
    @ApiResponse({
        status: 200,
        description: 'Actualiza la información solicitada'
    })
    restoreProducts(@Param('id') id: number) {
        return this.ProductService.restoreProducts(id);
    }

    @Patch('/stock')
    @ApiOperation({description: 'Reemplaza el valor del stock actual con el valor proporcionado'})
    @ApiBody({ 
        description: 'Utiliza un StockDto para registrar el cambio',
        type: StockDto,
        examples: {
            ejemplo1: {
                value: {
                    "id": 1,
                    "stock": 220
                }
            }
        }
        
    })
    @ApiResponse({
        status: 200,
        description: 'Actualiza la información solicitada'
    })
    updateStock(@Body() stock: StockDto){
        return this.ProductService.updateStock(stock);
    }

    @Patch('/increment-stock')
    @ApiOperation({description: 'Suma el valor proporcionado al stock actual, el maximo es 1000'})
    @ApiBody({ 
        description: 'Utiliza un StockDto para registrar el cambio',
        type: StockDto,
        examples: {
            ejemplo1: {
                value: {
                    "id": 1,
                    "stock": 220
                }
            }
        }
        
    })
    @ApiResponse({
        status: 200,
        description: 'Actualiza la información solicitada'
    })
    incrementStock(@Body() stock: StockDto){
        return this.ProductService.incrementStock(stock)
    }

    @Patch('/decrement-stock')
    @ApiOperation({description: 'Decrementa el valor del stock de acuerdo al valor proporcionado'})
    @ApiBody({ 
        description: 'Utiliza un StockDto para registrar el cambio',
        type: StockDto,
        examples: {
            ejemplo1: {
                value: {
                    "id": 1,
                    "stock": 20
                }
            }
        }
        
    })
    @ApiResponse({
        status: 200,
        description: 'Actualiza la información solicitada'
    })
    decrementStock(@Body() stock: StockDto){
        return this.ProductService.decrementStock(stock)
    }
}
