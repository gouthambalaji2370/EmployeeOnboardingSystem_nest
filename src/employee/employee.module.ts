import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { EmployeeRepository } from './employee.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleRepository } from '../role/role.repository';
import { UserRepository } from '../user/user.repository';
import { AddressRepository } from 'src/address/address.repository';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports:[TypeOrmModule.forFeature([EmployeeRepository,RoleRepository,UserRepository,AddressRepository]),MailModule],
  controllers: [EmployeeController],
  providers: [EmployeeService],
})
export class EmployeeModule {}
