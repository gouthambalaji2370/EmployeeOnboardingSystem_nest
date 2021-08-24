import { Employee } from 'src/employee/entities/employee.entity';
import { Role } from 'src/role/entities/role.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    sno: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToOne(() => Employee,employee => employee.id)
    @JoinColumn()
    employee: Employee;

    @ManyToOne(() => Role, role => role.id)
    role: Role;
}
