import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlightData } from '../flight-data/entity/flightData.entity';
import { FlightAnalyticsController } from './flight-analytics.controller';
import { FlightAnalyticsService } from './flight-analytics.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forFeature([FlightData])
  ],
  controllers: [FlightAnalyticsController],
  providers: [FlightAnalyticsService]
})
export class FlightAnalyticsModule {}
