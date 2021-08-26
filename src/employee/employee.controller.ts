import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Put, ValidationPipe } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { UpdateStatusDto } from './dto/update-status.dto';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    let data=this.employeeService.create(createEmployeeDto);
    if(data===null){
      throw new HttpException('unable to insert data', HttpStatus.EXPECTATION_FAILED);
    }
    return data;
  }

  @Get()
  findAll() {
    return this.employeeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeeService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body(new ValidationPipe({ transform: true })) updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeeService.update(+id, updateEmployeeDto);
  }
  @Put(':id/status')
  updateStatus(@Param('id')id:string,@Body() updateStatusDto:UpdateStatusDto){
    return this.employeeService.updateStatus(+id,updateStatusDto);
  }
  @Post(':id/notification')
  notifyEmployee(@Param('id')id:string){
    return this.employeeService.notifyEmployee(+id);
  }
}
