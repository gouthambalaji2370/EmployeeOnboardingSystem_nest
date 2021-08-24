import { Repository, EntityRepository } from 'typeorm';
import { Address } from './entities/address.entity';
import { Employee } from 'src/employee/entities/employee.entity';


@EntityRepository(Address)
export class AddressRepository extends Repository<Address>{
    public async findByEmployee(
        employee:Employee
    ):Promise<Address[]>{
       return this.find({where :{employee:employee}});
    }
}