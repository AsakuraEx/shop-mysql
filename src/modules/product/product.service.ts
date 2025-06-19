import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entity/product.entity';
import { Repository, UpdateResult } from 'typeorm';
import { ProductDto } from './dto/product.dto';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { StockDto } from './dto/stock.dto';

@Injectable()
export class ProductService {

    private MIN_STOCK = 0
    private MAX_STOCK = 1000

    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>
    ) {}

    async createProduct(product: ProductDto) {

        if(product.id){

            const productExist: any = await this.getProductById(product.id);
    
            if(productExist){
                throw new ConflictException('El producto con el id ' + product.id + ' ya existe.');
            }

        }

        return await this.productRepository.save(product);
    }
    
    async findAll(){
        return await this.productRepository.find({
            where: {
                deleted: false
            }
        });
    }

    async findAllDeleted(){
        return await this.productRepository.find({
            where: {
                deleted: true
            }
        })
    }

    async getProductById(id: number){
        return await this.productRepository.findOne({
            where: { id }
        })
    }

    async updateProduct(product: ProductDto){
        if(product.id){
            return await this.productRepository.save(product);
        }

        throw new ConflictException("El producto proporcionado no posee un id")
    }

    async deleteProduct(id: number){
        const product: any = await this.getProductById(id);

        if(!product){
            throw new ConflictException("No existe el producto que desea eliminar");
        }

        if(product.deleted){
            throw new ConflictException("El producto ya ha sido eliminado");
        }

        const rows: UpdateResult = await this.productRepository.update(
            {
                id
            },
            {
                deleted: true
            }
        );

        return rows.affected == 1;
    }

    async restoreProducts(id: number){
        const product: any = await this.getProductById(id);

        if(!product.deleted){
            throw new ConflictException("El producto no está eliminado");
        }

        return this.productRepository.update(
            { id },
            { deleted: false }
        )
    }

    async updateStock(s: StockDto){

        const product = await this.getProductById(s.id)

        if(!product){
            throw new ConflictException("El producto no existe");
        }

        if(product.deleted){
            throw new ConflictException("El producto esta eliminado");
        }

        return await this.productRepository.update(
            { id: s.id },
            { stock: s.stock }
        )
    }

    async incrementStock(s: StockDto){
        const product = await this.getProductById(s.id)

        if(!product){
            throw new ConflictException("El producto no existe");
        }

        if(product.deleted){
            throw new ConflictException("El producto esta eliminado");
        }

        const stockTotal = product.stock + s.stock;

        if(stockTotal >= this.MIN_STOCK && stockTotal <= this.MAX_STOCK){
            try{
                return await this.productRepository.update(
                    { id: s.id },
                    { stock: stockTotal }
                )
                
            }catch(e){
                throw new Error('Ocurrio un error al actualizar el stock')
            }
        }else{
            throw new Error('El monto que quiere ingresar, supera el nivel máximo del STOCK')
        }

    }

    async decrementStock(s: StockDto){
        const product = await this.getProductById(s.id)

        if(!product){
            throw new ConflictException("El producto no existe");
        }

        if(product.deleted){
            throw new ConflictException("El producto esta eliminado");
        }

        let stockTotal = this.MIN_STOCK;

        if(product.stock - s.stock == this.MIN_STOCK){
            try{
                return await this.productRepository.update(
                    { id: s.id },
                    { stock: stockTotal }
                )
                
            }catch(e){
                throw new Error('Ocurrio un error al actualizar el stock')
            }
        }
        
        if(product.stock - s.stock > 0) {
            stockTotal = product.stock - s.stock;

            try{
                return await this.productRepository.update(
                    { id: s.id },
                    { stock: stockTotal }
                )
                
            }catch(e){
                throw new Error('Ocurrio un error al actualizar el stock')
            }

        }

        if(product.stock - s.stock < 0) {

            throw new Error('No puede tener saldos negativos');

        }

    }
}
