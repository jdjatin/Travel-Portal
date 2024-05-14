/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body,Query, UseGuards, Request} from '@nestjs/common';
import { HotelBookingService } from './hotel-booking.service';
import { hotelBookingDto } from './dto/hotelBooking.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { HotelSearch } from './dto/hotelSearch.dto';
import { HotelOffers } from './dto/hotelOffers.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('HotelBooking')
@Controller('hotel-booking')
export class HotelBookingController {
  constructor(private readonly hotelBookingService: HotelBookingService) {}

 
  @Get()
  async hotelSearch(@Query() data:HotelSearch) {
    return await this.hotelBookingService.hotelSearch(data)
  }

  @Get('/hotel-offer')
  async hotelOffer(@Query() data:HotelOffers) {
    return await this.hotelBookingService.hotelOffer(data)
  }


  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @Post('/hotel-booking')
  async hotelBooking(@Body() data:hotelBookingDto,
  @Request() req,) {
    let userId = { userId: req.user.id };
    return await this.hotelBookingService.hotelBooking(data, userId)
  }

  
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @Get('/old-bookings')
  async orderHistory(@Request() req) {
    let userId = { userId: req.user.id };
    console.log(req.user)
    return await this.hotelBookingService.hotelOrderHistory(userId)
}


}
