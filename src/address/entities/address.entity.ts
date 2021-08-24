import { Employee } from '../../employee/entities/employee.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne,JoinColumn } from 'typeorm';

@Entity()
export class Address {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    type:string;

    @Column()
    flatName:string;

    @Column()
    street:string;

    @Column()
    area:string;

    @Column()
    district:string;

    @Column()
    state:string;

    @Column()
    country:string;

    @Column()
    pincode:string;

    @Column()
    mapCoordinates:string;

    @ManyToOne(type => Employee, (employee) => employee.id)
    @JoinColumn({name:"employee_id",referencedColumnName: 'id'})
    employee: Employee;

}
