/* eslint-disable prettier/prettier */
import { Column, CreateDateColumn, Entity,  PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name:'IATA_Codes'})

export class IATACodes {

    @Column()
    City:string;

    @Column()
    IATA_Code:string;


}