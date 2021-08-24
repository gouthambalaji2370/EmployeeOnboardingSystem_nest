import { PartialType } from '@nestjs/mapped-types';
import { CreateAddressDto } from './create-address.dto';

export class UpdateAddressDto extends PartialType(CreateAddressDto) {
    readonly type:string;

    readonly flatName:string;

    readonly street:string;

    readonly area:string;

    readonly district:string;

    readonly state:string;

    readonly country:string;

    readonly pincode:string;

    readonly mapCoordinates:string;
}
