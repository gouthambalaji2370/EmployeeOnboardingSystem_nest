import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  create(createUserDto: CreateUserDto) {
    return this.create(createUserDto);
  }

  findAll() {
    return this.findAll();
  }

  findByEmailAndPassword(emailId:string,password:string) {
    return this.findByEmailAndPassword(emailId,password);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.update(id,updateUserDto);
  }

}
