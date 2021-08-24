import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateEmployeeDto {
    @IsNotEmpty()
    readonly  name: string;

    @IsNotEmpty()
    @IsEmail()
    readonly emailId:string; 

    @IsNotEmpty()
    readonly password:string;

    @IsNotEmpty()
    readonly roleid:number;
}
