import { Injectable } from '@nestjs/common';
import { AddressRepository } from 'src/address/address.repository';
import { RoleRepository } from 'src/role/role.repository';
import { UserRepository } from 'src/user/user.repository';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { EmployeeRepository } from './employee.repository';
import { MailService } from 'src/mail/mail.service';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeeService {
 
  constructor( 
    private employeeRepository: EmployeeRepository, 
    private roleRepository:RoleRepository,
    private userRepository:UserRepository,
    private addressRepository:AddressRepository,
    private mailService:MailService
  ){

  }
 async create(createEmployeeDto: CreateEmployeeDto) {
  let dateTime = new Date()
  console.log(createEmployeeDto);
   let data = await this.employeeRepository.save({name:createEmployeeDto.name,emailId:createEmployeeDto.emailId,created_at:dateTime});
   let role= await this.roleRepository.findOne(createEmployeeDto.roleid);
  let user=await this.userRepository.save({email:createEmployeeDto.emailId,password:createEmployeeDto.password,role:role,employee:data});
  console.log(user);
    if( data!==null && user!==null){
    return data;
  }
else{
  return null;
}
  }

 async findAll() {
    return await this.employeeRepository.find({relations: ['addressSet']});
  }

  async findOne(id: number) {
    let employee=await this.employeeRepository.findOne({where: {id: id}, relations: ['addressSet']})
    return employee;
  }

  async notifyEmployee(id:number){
    let employee=await this.employeeRepository.findOne({where: {id: id}, relations: ['addressSet']})
    await this.mailService.sendNotification(employee,'notify');
    return 'success'
  }
  async updateStatus(id:number,updateStatusDto:UpdateStatusDto){
    let employee=await this.employeeRepository.findOne({where: {id: id}, relations: ['addressSet']})
    if(updateStatusDto.action==='approve'){
      employee.currentStatus='COMPLETED'
      await this.mailService.sendNotification(employee,'approve');
    }
    else if(updateStatusDto.action==='reject'){
      employee.currentStatus='REJECTED'
      employee.rejectReason=updateStatusDto.reason
      await this.mailService.sendNotification(employee,'reject');
    }
    let data= await this.employeeRepository.save(employee);
    return 'success'
  }
  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    let name=updateEmployeeDto.firstName+" "+updateEmployeeDto.lastName;
    let code=id+1;
    let codeString=String(code);
    let update_object= {
      id:id,
      name:name,
      phoneNumber:updateEmployeeDto.phoneNumber,
      employeeCode:codeString,
      aadharNumber:updateEmployeeDto.aadharNumber,
      gender:updateEmployeeDto.gender,
      dob:updateEmployeeDto.dob,
      bloodGroup:updateEmployeeDto.bloodGroup,
      sslcScore:updateEmployeeDto.sslcScore,
      hscScore:updateEmployeeDto.hscScore,
      ugScore:updateEmployeeDto.ugScore,
      fatherName:updateEmployeeDto.fatherName,
      motherName:updateEmployeeDto.motherName,
      emergencyContactRelation:updateEmployeeDto.emergencyContactRelation,
      emergencyContactName:updateEmployeeDto.emergencyContactName,
      emergencyContactNumber:updateEmployeeDto.emergencyContactNumber,
      addressSet:updateEmployeeDto.addressSet,
      rejectReason:null,
      currentStatus:""}
      if(updateEmployeeDto.action==="submit"){
        update_object.currentStatus="pending"
      }
      else{
        update_object.currentStatus="incomplete"
      }
      let data= await this.employeeRepository.save(update_object);
    let address1=  await this.addressRepository.save({type:updateEmployeeDto.addressSet[0].type,flatName:updateEmployeeDto.addressSet[0].flatName,street:updateEmployeeDto.addressSet[0].street,district:updateEmployeeDto.addressSet[0].district, area:updateEmployeeDto.addressSet[0].area,state:updateEmployeeDto.addressSet[0].state,country:updateEmployeeDto.addressSet[0].country,pincode:updateEmployeeDto.addressSet[0].pincode,mapCoordinates:updateEmployeeDto.addressSet[0].mapCoordinates,employee:data})
    let address2=  await this.addressRepository.save({type:updateEmployeeDto.addressSet[1].type,flatName:updateEmployeeDto.addressSet[1].flatName,street:updateEmployeeDto.addressSet[1].street,district:updateEmployeeDto.addressSet[1].district, area:updateEmployeeDto.addressSet[1].area,state:updateEmployeeDto.addressSet[1].state,country:updateEmployeeDto.addressSet[1].country,pincode:updateEmployeeDto.addressSet[1].pincode,mapCoordinates:updateEmployeeDto.addressSet[1].mapCoordinates,employee:data})
    return data;
  }

}
