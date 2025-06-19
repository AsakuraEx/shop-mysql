import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsPositive, Max, Min } from "class-validator";

export class StockDto {

    @ApiProperty({name: "id", required: true, description: 'id que referencia el id del producto', type: Number})
    @IsNotEmpty()
    @IsPositive()
    @IsNumber()
    id: number;

    @ApiProperty({name: "stock", required: true, description: 'Stock del producto', type: Number})
    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    @Max(1000)
    stock: number;

}