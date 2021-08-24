import { PartialType } from '@nestjs/mapped-types';
import { Employee } from 'src/employee/entities/employee.entity';
import { Role } from 'src/role/entities/role.entity';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    email: string;

    password: string;

    employee: Employee;

    role: Role;
}
