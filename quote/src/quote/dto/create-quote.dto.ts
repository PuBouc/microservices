import { IsNotEmpty, IsNumberString } from 'class-validator'

export class CreateQuoteDTO {
    @IsNotEmpty()
    readonly brand: string;
    
    @IsNotEmpty()
    readonly car: string;

    @IsNotEmpty()
    @IsNumberString()
    readonly price: number;

    @IsNumberString()
    readonly percentage: number;
}