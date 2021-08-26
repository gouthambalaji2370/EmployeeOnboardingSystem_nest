import { Injectable } from '@nestjs/common';
import { RoleRepository } from './role.repository';

@Injectable()
export class RoleService {
  constructor( private roleRepository:RoleRepository
    ){
      }
 async findAll() {
    let data= await this.roleRepository.findAllRoles();
    return {'success':true,data:data};
  }

 async findOneByName(data:string) {
    return await this.roleRepository.findByName(data);
  }
}
