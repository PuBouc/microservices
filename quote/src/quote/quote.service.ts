import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateQuoteDTO } from './dto/create-quote.dto';
import { IQuote } from './interfaces/quote.interface';

@Injectable()
export class QuoteService {
    constructor(@InjectModel('Quote') private readonly quoteModel: Model<IQuote>) {}

    async getQuotes(car: string): Promise<IQuote[]> {
        const quotes = await this.quoteModel.find({ car: car }).exec();

        return quotes;
    }

    async createQuote(createQuoteDTO: CreateQuoteDTO): Promise<IQuote> {
        const newQuote = await new this.quoteModel(createQuoteDTO);

        return newQuote.save();
    }

    async getCars() {
        return await this.quoteModel.find().distinct('car').exec();
    }
}
