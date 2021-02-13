import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class ValidateAge implements PipeTransform<number> {
    async transform(value: number, metadata: ArgumentMetadata) {
        if (value < 18) {
            throw new BadRequestException('Too young');
        }

        return value;
    }
}