import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class ProductDto {
    
    @ApiProperty({name: "id", required: false, description: 'id del producto', type: Number})
    @IsNumber()
    @IsPositive()
    @IsOptional()
    id?: number;

    @ApiProperty({name: "name", required: true, description: 'nombre del producto', type: String})
    @IsString()
    @IsNotEmpty()
    name!: string;

    @ApiProperty({name: "price", required: true, description: 'precio del producto', type: Number})
    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    price!: number;

    @ApiProperty({name: "stock", required: true, description: 'stock del producto', type: Number})
    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    stock!: number;

    @ApiProperty({name: "deleted", required: false, description: 'Identifica si el producto está eliminado logicamente', type: Boolean})
    @IsBoolean()
    @IsOptional()
    deleted?: boolean;

}