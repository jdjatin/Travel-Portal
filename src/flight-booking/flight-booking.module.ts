/* eslint-disable prettier/prettier */
import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import * as NodeCache from 'node-cache';
import { FlightBookingService } from './flight-booking.service';
import { FlightBookingController } from './flight-booking.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { TravelBookings } from './entities/bookingToken.entity';
import { UsersModule } from '../users/users.module';
import { User } from '../users/entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { UsersService } from '../users/services/users/users.service';
import { IATACodes } from './entities/iataCodes.entity';
import { BookingResponse } from './entities/bookingRequest.entity';
// import { BookingRequest } from './entities/bookingRequest.entity';
@Module({
  imports: [HttpModule, User, UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forFeature([TravelBookings, User, IATACodes,
      //  BookingRequest 
      BookingResponse
      ])
  ],
  providers: [FlightBookingService, UsersService ],
  controllers: [FlightBookingController],
  exports:[FlightBookingService]
})
export class FlightBookingModule {}
