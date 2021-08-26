import { Address } from '../../address/entities/address.entity';
import { Entity, Column, PrimaryGeneratedColumn,CreateDateColumn, OneToMany, JoinColumn } from 'typeorm';
import { type } from 'os';

@Entity("employee_demographics")
export class Employee{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({default:null})
    phoneNumber:string;

    @Column({default:null})
    employeeCode:string;

    @Column({default:null})
    aadharNumber:string;

    @Column({default:null})
    gender:string;

    @Column({default:null})
    bloodGroup:string;

    @Column()
    emailId:string;

    @Column({default:null})
    dob:string;

    @Column("decimal",{default:null})
    sslcScore:number;

    @Column("decimal",{default:null})
    hscScore:number;

    @Column("decimal",{default:null})
    ugScore:number;

    @Column({default:null})
    fatherName:string;

    @Column({default:null})
    motherName:string;

    @Column({default:null})
    emergencyContactName:string;

    @Column({default:null})
    emergencyContactNumber:string;

    @Column({default:null})
    emergencyContactRelation:string;

    @Column({default:null})
    currentStatus:string;

    @Column({default:null})
    rejectReason:string;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_at: Date;

    @OneToMany(type => Address, (address) => address.employee,{cascade:['insert','update']})
    addressSet: Address[];


}
