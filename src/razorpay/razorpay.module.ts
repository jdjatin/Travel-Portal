import { Module } from '@nestjs/common';
import { RazorpayController } from './razorpay.controller';
import { RazorpayService } from './razorpay.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateCustomer } from './entities/createCustomer.entity';
import { PaymentLinks } from './entities/paymentLinks.entity';
import { TravelBookings } from '../flight-booking/entities/bookingToken.entity';
import { FlightBookingModule } from '../flight-booking/flight-booking.module';

@Module({
  imports: [FlightBookingModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forFeature([CreateCustomer,PaymentLinks, TravelBookings])
  ],
  controllers: [RazorpayController],
  providers: [RazorpayService]
})
export class RazorpayPaymentModule {
 
}
