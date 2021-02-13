import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuoteController } from './quote.controller';
import { QuoteService } from './quote.service';
import { QuoteSchema } from './schemas/quote.schema';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthGuard } from 'src/guards/auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
      MongooseModule.forFeature([
        { name: 'Quote', schema: QuoteSchema },
    ]),
    ClientsModule.register([{
      name: 'AUTH_CLIENT',
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 4000
      }
    }])
  ],
  controllers: [
    QuoteController
  ],
  providers: [
    QuoteService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    }
  ]
})
export class QuoteModule {}
