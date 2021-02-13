import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';

export type QuoteDocument = QuoteModel & Document;

@Schema()
export class QuoteModel {
    @Prop()
    brand: string;

    @Prop()
    car: string;

    @Prop()
    price: number

    @Prop()
    percentage: number
}

export const QuoteSchema = SchemaFactory.createForClass(QuoteModel);
