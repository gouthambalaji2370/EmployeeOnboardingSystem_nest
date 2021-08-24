import { Employee } from "src/employee/entities/employee.entity";
import { Role } from "src/role/entities/role.entity";
import { IsEmail, IsNotEmpty,IsNotEmptyObject } from 'class-validator';

export class CreateUserDto {

   @IsNotEmpty()
   @IsEmail()
   email: string;

    @IsNotEmpty()
   password: string;

    @IsNotEmptyObject()
    employee: Employee;

    @IsNotEmptyObject()
    role: Role;
}
