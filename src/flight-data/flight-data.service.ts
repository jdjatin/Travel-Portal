/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { FlightData } from './entity/flightData.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';



@Injectable()
export class FlightDataService {
    constructor(
    @InjectRepository(FlightData)
    private readonly flights: Repository<FlightData>,
  ) {}

  findAll(): Promise<FlightData[]> {
    return this.flights.find();
  }

  findOne(id): Promise<FlightData> {
    return this.flights.findOne(id);
  }

  create(flightData: FlightData): Promise<FlightData> {
    return this.flights.save(flightData);
  }

  async update(id, flightData: FlightData): Promise<FlightData> {
    await this.flights.update(id, flightData);
    return this.flights.findOne(id);
  }

  delete(id: number): Promise<void> {
    return this.flights.delete(id).then(() => undefined);
  }



}
