import { IsEmail, IsNotEmpty,IsNotEmptyObject } from 'class-validator';
export class CreateAddressDto {

    @IsNotEmpty()
    readonly type:string;

    @IsNotEmpty()
    readonly flatName:string;

    @IsNotEmpty()
    readonly street:string;

    @IsNotEmpty()
    readonly area:string;

    @IsNotEmpty()
    readonly district:string;

    @IsNotEmpty()
    readonly state:string;

    @IsNotEmpty()
    readonly country:string;

    @IsNotEmpty()
    readonly pincode:string;
    
    @IsNotEmpty()
    readonly mapCoordinates:string;

}
