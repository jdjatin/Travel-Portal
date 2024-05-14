/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import { Body, Controller, Post, Get, ValidationPipe, Param, Request, BadRequestException, Query, UseGuards, Delete } from '@nestjs/common';
import { FlightBookingService } from './flight-booking.service';
import { originDestinationsDto } from './dto/originDestinations.Dto';
import { RealIP } from 'nestjs-real-ip';
import { getFlightSearch } from './dto/getFlightSearch.dto';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from '../users/services/users/users.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { priceCheck } from './dto/priceCheck.dto';
import { flightOrder } from './dto/flightOrder.dto';
import { deleteOrder } from './dto/deleteOrder.dto';
import { orderHistory } from './dto/orderHistory.dto';

@ApiTags('FlightBooking')
@Controller('flight-booking')
export class FlightBookingController {
    constructor(private readonly FlightBookingService: FlightBookingService,
        private readonly user: UsersService) { }


    @Get()
    async flightSearcgGet(@Query() data: getFlightSearch) {
        return await this.FlightBookingService.flightSearchGet(data);
    }


    @Post()
    async flightSearch(@Body() data: originDestinationsDto) {

        const flights = await this.FlightBookingService.flightSearch(data);
        return flights;
    }

    @Post('/priceCheck')
    async searchFlight(@Body() data) {
        console.log('DC', data)
        const res = await this.FlightBookingService.priceCheck(data);
        return res;
    }

    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth('access-token')
    @Post('/flightOrder')
    async createOrder(@Body() data,
        @Request() req,

    ) {
        let userId = { userId: req.user.id };

        return await this.FlightBookingService.flightCreateOrder(data, userId);
    }


    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth('access-token')
    @Get('/orderHistory')
    async orderHistory(@Request() req) {
        let userId = { userId: req.user.id };
        console.log(req.user)
        return await this.FlightBookingService.flightOrderHistory(userId)
    }

    // @UseGuards(AuthGuard('jwt'))
    // @ApiBearerAuth('access-token')
    // @Get('/upcommingFlights')
    // async upcommingFlights(@Request() req) {
    //     let userId={userId: req.user.id };
    //     console.log(req.user)
    //     return await this.FlightBookingService.upcommingFlights(userId)
    // }

    

    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth('access-token')
    @Delete('/cancel')
    async cancelFlight(@Query() data:deleteOrder) {
        return await this.FlightBookingService.flightCancel(data.id);
    }


}


