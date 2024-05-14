/* eslint-disable prettier/prettier */
import { Controller, Post, Get, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { FlightDataService } from './flight-data.service';
import { FlightData } from './entity/flightData.entity';
import { FlightDataDto } from './dto/flightData.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Flight Data')
@Controller('flight-data')
export class FlightDataController {

        constructor(private readonly flightsService: FlightDataService) {}
      
        @Get()
        async findAll(): Promise<FlightData[]> {
          return this.flightsService.findAll();
        }
      
        @Get(':id')
        async findOne(@Param('id') id: number): Promise<FlightData> {
          return this.flightsService.findOne(id);
        }
      
        @Post()
        async create(@Query() flightDataDto) {
          const flightData = new FlightData();
          flightData.origin_name = flightDataDto.origin_name;
          flightData.destination_name = flightDataDto.destination_name;
          flightData.origin_iata = flightDataDto.origin_iata;
          flightData.destination_iata = flightDataDto.destination_iata;
          return this.
          flightsService.create(flightData);
        }
      
        @Put(':id')
        async update(
          @Param('id') id: number,
          @Body() flightDataDto: FlightDataDto,
        ): Promise<FlightData> {
          const flightData = new FlightData();
          flightData.origin_name = flightDataDto.origin_name;
          flightData.destination_name = flightDataDto.destination_name;
          flightData.origin_iata = flightDataDto.origin_iata;
          flightData.destination_iata = flightDataDto.destination_iata;
          return this.flightsService.update(id, flightData);
        }
      
        @Delete(':id')
        async delete(@Param('id') id: number): Promise<void> {
          await this.flightsService.delete(id);
        }



}
