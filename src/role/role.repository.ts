import { Repository, EntityRepository, Not } from 'typeorm';
import { Role } from './entities/role.entity';

@EntityRepository(Role)
export class RoleRepository extends Repository<Role>{

    public async findByName(data:string):Promise<Role>{
        return this.findOne({where:{role_name:data['name']}});
    }
    public async findAllRoles():Promise<Role[]>{
        return this.find({where:{role_name: Not('HR')}})
    }
}