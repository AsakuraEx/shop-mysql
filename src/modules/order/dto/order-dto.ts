import { Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsDate, IsNotEmpty, IsOptional, IsUUID } from "class-validator";
import { ClientDto } from "src/modules/client/dto/client-dto";
import { ProductDto } from "src/modules/product/dto/product.dto";

export class OrderDto {

    @IsOptional()
    @IsUUID()
    id?: string;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    createAt?: Date;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    updateAt?: Date;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    confirmAt?: Date;

    @IsNotEmpty()
    @Type(()=> ClientDto)
    client!: ClientDto

    @IsNotEmpty()
    @IsArray()
    @ArrayNotEmpty()
    @Type(()=>ProductDto)
    products!: ProductDto[];

}