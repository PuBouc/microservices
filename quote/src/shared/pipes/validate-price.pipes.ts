import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class ValidatePrice implements PipeTransform<number> {
    async transform(value: number, metadata: ArgumentMetadata) {
        if (value < 5000) {
            throw new BadRequestException('Price too low');
        }

        return value;
    }
}