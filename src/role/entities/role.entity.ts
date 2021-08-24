import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity("role")
export class Role {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    role_name:string;
}
