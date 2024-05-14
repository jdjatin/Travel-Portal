/* eslint-disable prettier/prettier */
import { Column, CreateDateColumn, Entity,  PrimaryGeneratedColumn, UpdateDateColumn, BaseEntity } from "typeorm";

@Entity({name:'travel_bookings'})

export class TravelBookings {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('uuid')
    userId:string;

    @Column({ type: 'json' })
    booking_request: string;

    @Column({ type: 'json' })
    booking_response: string;


    @Column({ nullable: true })
    Status:string;
    
    @Column()
    flight_date:string;

    @Column()
    payment_id:string;

    // @Column({ nullable: true })
    // payment_status:string;

    
    @CreateDateColumn({ name: 'created_at' }) 'created_at': Date;

    @UpdateDateColumn({ name: 'updated_at' }) 'updated_at': Date;

    
}


