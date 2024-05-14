import { Controller,Get, Query, UseGuards } from '@nestjs/common';
import { AdminPanelService } from './admin-panel.service';
import { PaginationDto } from './dto/paginationDto';
// import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../admin-auth/jwt-auth.guard';

// @UseGuards(JwtAuthGuard)
@Controller('admin-panel')
export class AdminPanelController {
    constructor(
        private readonly adminPanelService:AdminPanelService
    ) {}

@UseGuards(JwtAuthGuard)
@Get('flight-orders')
async getFlightOrders(@Query() paginationDto:PaginationDto,) {
  const offset = (paginationDto.page - 1) * paginationDto.limit;
  const bookings = await this.adminPanelService.fetchFlightBookings(paginationDto.limit, offset);
  return bookings;
}

@UseGuards(JwtAuthGuard)
@Get('users')
    async getUsers() {
        return await this.adminPanelService.getUsers();
    }
}
