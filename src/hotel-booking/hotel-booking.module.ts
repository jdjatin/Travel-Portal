import { Module } from '@nestjs/common';
import { HotelBookingService } from './hotel-booking.service';
import { HotelBookingController } from './hotel-booking.controller';
import { HotelBooking } from './entities/hotel-booking.entity';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forFeature([HotelBooking])
  ],
  controllers: [HotelBookingController],
  providers: [HotelBookingService]
})
export class HotelBookingModule {}
