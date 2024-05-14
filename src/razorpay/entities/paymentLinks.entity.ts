import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity({'name':'PaymentLinks'})
export class PaymentLinks {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('uuid')
    userId:string;

    @Column({ type: 'json' })
    link_response: string;

    
    @CreateDateColumn({ name: 'created_at' }) 'created_at': Date;

    @UpdateDateColumn({ name: 'updated_at' }) 'updated_at': Date;

}