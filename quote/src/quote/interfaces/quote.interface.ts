import { Document } from 'mongoose';

export interface IQuote extends Document {
    id?:string,
    brand: string,
    car: string,
    price: number,
    percentage: number,
}