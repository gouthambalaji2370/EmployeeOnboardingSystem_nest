import { Address } from 'src/address/entities/address.entity';
import {IsDate, IsNotEmpty} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateEmployeeDto {
  
    @IsNotEmpty()
    readonly action:string;
    
    @IsNotEmpty()
    readonly  firstName: string;

    @IsNotEmpty()    
    readonly  lastName: string;

    @IsNotEmpty()
    readonly phoneNumber:string;

    @IsNotEmpty()
    readonly aadharNumber:string;

    @IsNotEmpty()
    readonly gender:string;

    @IsNotEmpty()
    readonly bloodGroup:string;

    @IsNotEmpty()
    readonly dob:string;

    @IsNotEmpty()
    readonly sslcScore:number;

    @IsNotEmpty()
    readonly hscScore:number;

    @IsNotEmpty()
    readonly ugScore:number;

    @IsNotEmpty()
    readonly fatherName:string;

    @IsNotEmpty()
    readonly motherName:string;

    @IsNotEmpty()
    readonly emergencyContactName:string;

    @IsNotEmpty()
    readonly emergencyContactNumber:string;

    @IsNotEmpty()
    readonly emergencyContactRelation:string;

    readonly addressSet: Address[];

    
}
