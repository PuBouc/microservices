import { Get } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { Query } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { ValidateAge } from 'src/shared/pipes/validate-age.pipes';
import { ValidatePrice } from 'src/shared/pipes/validate-price.pipes';
import { CreateQuoteDTO } from './dto/create-quote.dto';
import { QuoteService } from './quote.service';

@Controller()
export class QuoteController {
    constructor(private quoteService: QuoteService) {}

    @Get('quotes')
    async getQuotes(
        @Query('car') car: string,
        @Query('price', new ValidatePrice()) price: number,
        @Query('age', new ValidateAge()) age: number
    ) {
        const quotes = await this.quoteService.getQuotes(car);

        let calculatedQuotes = [];

        quotes.forEach(quote => {
            calculatedQuotes.push({
                "brand": quote.brand,
                "car": quote.car,
                "price": quote?.percentage === undefined ? quote.price : quote.price + (price * quote.percentage / 100)
            });
        });

        return calculatedQuotes;
    }

    @Post('quote')
    async createQuote(@Body() createQuoteDTO: CreateQuoteDTO) {
        return {
            'message': 'Quote has been successfully created!',
            'user': await this.quoteService.createQuote(createQuoteDTO),
        };
    }

    @Get('cars')
    async getCars() {
        return await this.quoteService.getCars();
    }
}
