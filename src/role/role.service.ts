import { Injectable } from '@nestjs/common';
import { RoleRepository } from './role.repository';

@Injectable()
export class RoleService {
  constructor( private roleRepository:RoleRepository
    ){
      }
 async findAll() {
    return await this.roleRepository.findAllRoles();
  }

 async findOneByName(data:string) {
    return await this.roleRepository.findByName(data);
  }
}
