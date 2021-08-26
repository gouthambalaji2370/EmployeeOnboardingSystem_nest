import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { EmployeeModule } from './employee/employee.module';
import { AddressModule } from './address/address.module';
import { RoleModule } from './role/role.module';
import { MailModule } from './mail/mail.module';
import { ConfigModule } from '@nestjs/config';




@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'employee_onboarding_system_nest',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    EmployeeModule,
    AddressModule,
    RoleModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {}
}
