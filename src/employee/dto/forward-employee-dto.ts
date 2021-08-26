import { Address } from 'src/address/entities/address.entity';
import { IsEmail, IsNotEmpty,IsNotEmptyObject, Matches } from 'class-validator';
const boolRegex = /^[2-9][0-9]{11}$/;

export class ForwardEmployeeDto {
    
    @IsNotEmpty()
     name: string;

    @IsNotEmpty()
     role:string;
    
    @IsEmail()    
      emailId: string;

    @IsNotEmpty()
     phoneNumber:string;

    @IsNotEmpty()
     employeeCode:string;

    @IsNotEmpty()
    @Matches(boolRegex,{
        message:`enter a valid aadhar number`
      })
     aadharNumber:string;

    @IsNotEmpty()
     gender:string;

    @IsNotEmpty()
     bloodGroup:string;

    @IsNotEmpty()
     dob:string;

    @IsNotEmpty()
     sslcScore:number;

    @IsNotEmpty()
     hscScore:number;

    @IsNotEmpty()
     ugScore:number;

    @IsNotEmpty()
     fatherName:string;

    @IsNotEmpty()
     motherName:string;

    @IsNotEmpty()
     emergencyContactName:string;

    @IsNotEmpty()
     emergencyContactNumber:string;

    @IsNotEmpty()
     emergencyContactRelation:string;


    @IsNotEmptyObject()
     addressSet: Address[];
}
