import { Repository, EntityRepository } from 'typeorm';
import { User } from './entities/user.entity';
export * from './user.module';


@EntityRepository(User)
export class UserRepository extends Repository<User>{
  public async findByEmailAndPassword(emailId:string,Password:string):Promise<User>{
    return this.findOne({where:{email:emailId,password:Password}});
  }

}