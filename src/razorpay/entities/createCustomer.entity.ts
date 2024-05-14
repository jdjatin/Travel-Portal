import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity({'name':'CreateCustomer'})
export class CreateCustomer {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('uuid')
    userId:string;

    @Column({ type: 'json' })
    customer_info: string;


    
    @CreateDateColumn({ name: 'created_at' }) 'created_at': Date;

    @UpdateDateColumn({ name: 'updated_at' }) 'updated_at': Date;

}