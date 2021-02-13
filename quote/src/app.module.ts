import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuoteModule } from './quote/quote.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://172.17.0.6:27017/quote', { useNewUrlParser: true }),
    QuoteModule
  ],
})
export class AppModule {}
