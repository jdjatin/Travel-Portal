import { Test, TestingModule } from '@nestjs/testing';
import { HotelBookingService } from './hotel-booking.service';

describe('HotelBookingService', () => {
  let service: HotelBookingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HotelBookingService],
    }).compile();

    service = module.get<HotelBookingService>(HotelBookingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
