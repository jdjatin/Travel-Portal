import {Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'Blog'})
export class Blog {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    title:string;

    @Column()
    description:string;
}
