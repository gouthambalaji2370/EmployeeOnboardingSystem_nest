import { Injectable } from '@nestjs/common';
import { AddressRepository } from 'src/address/address.repository';
import { RoleRepository } from 'src/role/role.repository';
import { UserRepository } from 'src/user/user.repository';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { EmployeeRepository } from './employee.repository';
import { MailService } from 'src/mail/mail.service';
import axios from 'axios';
import { ForwardEmployeeDto } from './dto/forward-employee-dto';
@Injectable()
export class EmployeeService {
 
  constructor( 
    private employeeRepository: EmployeeRepository, 
    private roleRepository:RoleRepository,
    private userRepository:UserRepository,
    private addressRepository:AddressRepository,
    private mailService:MailService,
  ){

  }
 async create(createEmployeeDto: CreateEmployeeDto) {
  let dateTime = new Date()
  let data = await this.employeeRepository.save({name:createEmployeeDto.name,emailId:createEmployeeDto.emailId,created_at:dateTime});
  
  let role= await this.roleRepository.findOne(createEmployeeDto.roleid);
  let user=await this.userRepository.save({email:createEmployeeDto.emailId,password:createEmployeeDto.password,role:role,employee:data});
    if(data!==null && user!==null){
    return data;
  }
else{
  return null;
}
  }

 async findAll() {
    let data= await this.employeeRepository.find({relations: ['addressSet']});
    return {'success':true,data:data};

  }

  async findOne(id: number) {
    let employee=await this.employeeRepository.findOne({where: {id: id}, relations: ['addressSet']})
    return {'success':true,data:employee};
  }

  async notifyEmployee(id:number){
    let employee=await this.employeeRepository.findOne({where: {id: id}, relations: ['addressSet']})
    await this.mailService.sendNotification(employee,'notify');
    return {'success':true,message:'Employee Notified Successfully'};
  }
  async updateStatus(id:number,updateStatusDto:UpdateStatusDto){
    let employee=await this.employeeRepository.findOne({where: {id: id}, relations: ['addressSet']})
    if(updateStatusDto.action==='approve'){
      employee.currentStatus='COMPLETED'
      let user= await this.userRepository.findOne({where:{employee:employee},relations:['role']});
      let requestData= new ForwardEmployeeDto();
      requestData.name=employee.name;
      requestData.emailId=employee.emailId;
      requestData.phoneNumber=employee.phoneNumber;
      requestData.fatherName=employee.fatherName;
      requestData.motherName=employee.motherName;
      requestData.employeeCode=employee.employeeCode;
      requestData.emergencyContactName=employee.emergencyContactName;
      requestData.emergencyContactRelation=employee.emergencyContactRelation;
      requestData.emergencyContactNumber=employee.emergencyContactNumber;
      requestData.aadharNumber=employee.aadharNumber;
      requestData.gender=employee.gender;
      requestData.addressSet=employee.addressSet;
      requestData.bloodGroup=employee.bloodGroup;
      requestData.dob=employee.dob;
      requestData.gender=requestData.gender;
      requestData.role=user.role.role_name;
      requestData.sslcScore=employee.sslcScore;
      requestData.ugScore=employee.ugScore;
      requestData.hscScore=employee.hscScore;
      axios.post("http://localhost:9252/employee",requestData).then((res)=>{
        if(res.data.success){
          employee.currentStatus='COMPLETED'
          this.mailService.sendNotification(employee,'approve');

        }
      }).catch((e)=>{
        console.log(e);
      });
    }
    else if(updateStatusDto.action==='reject'){
      employee.currentStatus='REJECTED'
      employee.rejectReason=updateStatusDto.reason
      await this.mailService.sendNotification(employee,'reject');
    }
    let data= await this.employeeRepository.save(employee);
    return {'success':true,message:'Employee Status updated Successfully'};

  }
 
  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    let name=updateEmployeeDto.firstName+" "+updateEmployeeDto.lastName;
    let code=id+1;
    let codeString=String(code);
    let employee=await this.employeeRepository.findOne({where: {id: id}, relations: ['addressSet']});
    if(employee.addressSet.length===0){
      employee.addressSet=updateEmployeeDto.addressSet;
    }
    else{
      for(let i=0;i<2;i++){
        if(employee.addressSet[i].type=updateEmployeeDto.addressSet[i].type){
          employee.addressSet[i].id=updateEmployeeDto.addressSet[i].id;
          employee.addressSet[i].flatName=updateEmployeeDto.addressSet[i].flatName
          employee.addressSet[i].pincode=updateEmployeeDto.addressSet[i].pincode
          employee.addressSet[i].street=updateEmployeeDto.addressSet[i].street
          employee.addressSet[i].district=updateEmployeeDto.addressSet[i].district
          employee.addressSet[i].state=updateEmployeeDto.addressSet[i].state
          employee.addressSet[i].country=updateEmployeeDto.addressSet[i].country
          employee.addressSet[i].mapCoordinates=updateEmployeeDto.addressSet[i].mapCoordinates
          employee.addressSet[i].area=updateEmployeeDto.addressSet[i].area
        }

      }
    
    }
    employee.name=name;
    employee.phoneNumber=updateEmployeeDto.phoneNumber;
    employee.employeeCode=codeString;
    employee.aadharNumber=updateEmployeeDto.aadharNumber;
    employee.gender=updateEmployeeDto.gender;
    employee.dob=updateEmployeeDto.dob;
    employee.bloodGroup=updateEmployeeDto.bloodGroup;
    employee.sslcScore=updateEmployeeDto.sslcScore;
    employee.hscScore=updateEmployeeDto.hscScore;
    employee.ugScore=updateEmployeeDto.ugScore;
    employee.fatherName=updateEmployeeDto.fatherName;
    employee.motherName=updateEmployeeDto.motherName;
    employee.emergencyContactRelation=updateEmployeeDto.emergencyContactRelation;
    employee.emergencyContactName=updateEmployeeDto.emergencyContactName;
    employee.emergencyContactNumber=updateEmployeeDto.emergencyContactNumber;

   
    if(updateEmployeeDto.action==="submit"){
      employee.currentStatus="pending"
        }
        else{
          employee.currentStatus="incomplete"
        }
        let data= await this.employeeRepository.save(employee);
    

        
    
    return {'success':true,message:'Employee updated Successfully'};
  }

}
