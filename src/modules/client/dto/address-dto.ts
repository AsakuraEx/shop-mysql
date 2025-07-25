import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class addressDto {

    @IsOptional()
    @IsPositive()
    @IsNumber()
    id?:number;

    @IsNotEmpty()
    @IsString()
    country!: string;

    @IsNotEmpty()
    @IsString()
    province!: string;

    @IsNotEmpty()
    @IsString()
    town!: string;

    @IsNotEmpty()
    @IsString()
    street!: string;

}