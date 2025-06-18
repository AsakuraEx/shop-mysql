import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class ProductDto {
    
    @IsNumber()
    @IsPositive()
    @IsOptional()
    id?: number;

    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    price!: number;

    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    stock!: number;

    @IsBoolean()
    @IsOptional()
    deleted?: boolean;

}