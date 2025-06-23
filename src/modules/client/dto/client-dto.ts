import { IsEmail, IsNotEmpty, IsNumber, IsObject, IsOptional, IsPositive, IsString } from "class-validator";
import { Address } from "../entity/address.entity";
import { Type } from "class-transformer";

export class ClientDto {

    @IsOptional()
    @IsPositive()
    @IsNumber()
    id?:number;

    @IsNotEmpty()
    @IsString()
    name!: string;

    @IsNotEmpty()
    @IsEmail()
    email!: string;

    @Type(()=> Address)
    @IsNotEmpty()
    address!: Address;
    
}