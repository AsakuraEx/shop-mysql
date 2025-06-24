import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Address } from "./address.entity";
import { addressDto } from "../dto/address-dto";

@Entity()
export class Client {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: String, nullable: false, length: 30})
    name: string;

    @Column({ type: String, nullable: false, length: 30, unique:true})
    email: string;

    @OneToOne(() => Address, { cascade: ['insert', 'update'], eager: true })
    @JoinColumn()
    address: addressDto;

}