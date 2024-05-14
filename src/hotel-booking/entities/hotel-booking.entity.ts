import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity({ name: 'Hotel_Bookings' })
export class HotelBooking {

    @PrimaryGeneratedColumn('uuid')
    id:number;

    @Column('uuid')
    userId:string;

    @Column({ type: 'json' })
    booking_response: string;


    @Column({ nullable: true })
    Status:string;

    
    @CreateDateColumn({ name: 'created_at' }) 'created_at': Date;

    @UpdateDateColumn({ name: 'updated_at' }) 'updated_at': Date;

}
