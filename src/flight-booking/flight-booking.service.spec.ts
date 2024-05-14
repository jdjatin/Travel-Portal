import { Test, TestingModule } from '@nestjs/testing';
import { FlightBookingService } from './flight-booking.service';

describe('FlightBookingService', () => {
  let service: FlightBookingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FlightBookingService],
    }).compile();

    service = module.get<FlightBookingService>(FlightBookingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
