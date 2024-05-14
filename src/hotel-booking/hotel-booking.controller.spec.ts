import { Test, TestingModule } from '@nestjs/testing';
import { HotelBookingController } from './hotel-booking.controller';
import { HotelBookingService } from './hotel-booking.service';

describe('HotelBookingController', () => {
  let controller: HotelBookingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HotelBookingController],
      providers: [HotelBookingService],
    }).compile();

    controller = module.get<HotelBookingController>(HotelBookingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
