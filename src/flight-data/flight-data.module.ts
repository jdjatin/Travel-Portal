import { Module } from '@nestjs/common';
import { FlightDataService } from './flight-data.service';
import { FlightDataController } from './flight-data.controller';
import { FlightData } from './entity/flightData.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forFeature([FlightData])
  ],
  providers: [FlightDataService],
  controllers: [FlightDataController]
})
export class FlightDataModule {}
