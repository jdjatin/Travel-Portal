import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TravelBookings } from '../flight-booking/entities/bookingToken.entity';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';



@Injectable()
export class AdminPanelService {

    constructor(
        @InjectRepository(TravelBookings)
        private readonly travelBooking:Repository<TravelBookings>,

        @InjectRepository(User)
        private readonly users:Repository<User>
    ) {}

    async fetchFlightBookings(limit: number, offset: number) {
        try {
          const bookings = await this.travelBooking.find({
            take: limit,
            skip: offset,
          });
      
          return bookings;
        } catch (error) {
          return error;
        }
      }


    async getUsers() {
        try {
            const data = await this.users.find();
            console.log(data)
            return JSON.stringify(data);
        } catch (error) {
            return error;
        }
    }
}
