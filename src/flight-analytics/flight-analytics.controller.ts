import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { FlightAnalyticsService } from './flight-analytics.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Flight-Analytics')
@Controller('flight-analytics')
export class FlightAnalyticsController {

    constructor(private readonly flightsService: FlightAnalyticsService) {}

    @Get('cheapest-flight')
    async cheapestFlight(@Query() data) {
      
      try {
        return await this.flightsService.cheapest_flights(data) 
      } catch (error) {
        return ('error'+error)
      }
    }

    @Get('inspiration-search') 
    async inspirationSearch(@Query() data) {
        try {
            return await this.flightsService.flight_inspiration(data)
        } catch (error) {
            return error;
        }
    }

    @Get('airport-routes')
    async airportRoutes(@Query() data) {
        try {
            return await this.flightsService.directDestination(data)
        } catch (error) {
            return error;
        }
    }

    @Get('airline-routes')
    async airlineRoutes(@Query() data) {
        return await this.flightsService.airlineRoutes(data)
    }

    @Post('get-token')
    async getToken(@Body() data ) {
        return await this.flightsService.getToken()
    }

    @Get('most-booked')
    async mostBooked(@Query() data) {
        return await this.flightsService.mostBooked(data);
    }

    @Get('airline-code') 
    async airlineCode (@Query() airlineCode) {
         return await this.flightsService.airlineCode(airlineCode)
    }
}
