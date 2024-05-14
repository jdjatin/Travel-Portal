import { Test, TestingModule } from '@nestjs/testing';
import { FlightBookingController } from './flight-booking.controller';

describe('FlightBookingController', () => {
  let controller: FlightBookingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FlightBookingController],
    }).compile();

    controller = module.get<FlightBookingController>(FlightBookingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
