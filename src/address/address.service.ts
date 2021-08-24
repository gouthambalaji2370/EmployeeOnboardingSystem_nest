import { Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Injectable()
export class AddressService {
  create(createAddressDto: CreateAddressDto) {
    return this.create(createAddressDto);
  }

  findAll() {
    return this.findAll();
  }

  findOne(id: number) {
    return this.findOne(id);
  }

  update(id: number, updateAddressDto: UpdateAddressDto) {
    return this.update(id,updateAddressDto);
  }

 
}
