import { MailerService } from '@nest-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Employee } from 'src/employee/entities/employee.entity';


@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) {}
    async sendNotification(user:Employee,type:string){
        let message:string;
        if(type==='approve'){
            message="Your Onboarding details provided is approved by the HR ";
        }
        else if(type ==='reject'){
           message="Your Onboarding details provided is being Rejected by the HR " + " for " +user.rejectReason
        }
        else{
            message="Please Complete the onboarding details form as soon as possible "
        }
        await this.mailerService.sendMail({
            to: user.emailId,
            subject: 'Employee onboarding form - Update',
            template: './notify', 
            context: {
              name: user.name,
              message:message,
            },
          });
    }

}
