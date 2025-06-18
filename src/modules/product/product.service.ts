import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entity/product.entity';
import { Repository } from 'typeorm';
import { ProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {

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

    async getProductById(id: number){
        return await this.productRepository.findOne({
            where: { id }
        })
    }
}
