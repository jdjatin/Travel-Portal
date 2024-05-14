/* eslint-disable prettier/prettier */
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'flight_data' })
export class FlightData {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    origin_name: string;

    @Column()
    destination_name: string;

    @Column()
    origin_iata: string;


    @Column()
    destination_iata: string;



}
