/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './users/entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { MailModule } from './mail/mail.module';
import { FlightBookingModule } from './flight-booking/flight-booking.module';
import { TravelBookings } from './flight-booking/entities/bookingToken.entity';
import { HotelBookingModule } from './hotel-booking/hotel-booking.module';
import { RefreshToken } from './auth/entities/refresh-token.entity';
import { FlightDataModule } from './flight-data/flight-data.module';
import { FlightData } from './flight-data/entity/flightData.entity';
import { FlightAnalyticsModule } from './flight-analytics/flight-analytics.module';
import { BlogsModule } from './blogs/blogs.module';
import { Blog } from './blogs/entities/blog.entity';
import { CreateCustomer } from './razorpay/entities/createCustomer.entity';
import { PaymentLinks } from './razorpay/entities/paymentLinks.entity';
import { RazorpayModule } from 'nestjs-razorpay';
import { RazorpayPaymentModule } from './razorpay/razorpay.module';
import { HotelBooking } from './hotel-booking/entities/hotel-booking.entity';
import { AdminPanelModule } from './admin-panel/admin-panel.module';
// import { BookingRequest } from './flight-booking/entities/bookingRequest.entity';
import { AdminUserCrudModule } from './admin-user-crud/admin-user-crud.module';
import { BookingResponse } from './flight-booking/entities/bookingRequest.entity';
import { TravelerCrudModule } from './traveler-crud/traveler-crud.module';
import { TravelerCrud } from './traveler-crud/entities/traveler-crud.entity';
import { AdminAuthModule } from './admin-auth/admin-auth.module';






@Module({
  
  
  imports: [

    ConfigModule.forRoot({ isGlobal: true }),
    RazorpayModule.forRoot({
      key_id: process.env.RP_API_KEY,
      // apiVersion: 'v1',
      key_secret: process.env.RP_API_SECRET,
      // options:{}
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule ],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        // port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [User, TravelBookings,  RefreshToken,  FlightData, Blog, CreateCustomer, PaymentLinks, HotelBooking, BookingResponse,TravelerCrud],
        synchronize: true,
      }),
      inject: [ConfigService],
      
    }),
    PassportModule,
    UsersModule,
    AuthModule,
    MailModule,
    FlightBookingModule,
    HotelBookingModule,
    FlightDataModule,
    FlightAnalyticsModule,
    BlogsModule,
    RazorpayPaymentModule,   
    AdminPanelModule, AdminUserCrudModule, TravelerCrudModule, AdminAuthModule 

  ],
  controllers: [],
  providers: [],
})

export class AppModule { }


