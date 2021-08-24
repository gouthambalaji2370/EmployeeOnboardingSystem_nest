import { Controller, Get, Body} from '@nestjs/common';
import { RoleService } from './role.service';
@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

 
  @Get()
  async findAll() {
    return await this.roleService.findAll();
  }

  @Get('/one')
 async findOne(@Body() data: string) {
    return await this.roleService.findOneByName(data);
  }

}
