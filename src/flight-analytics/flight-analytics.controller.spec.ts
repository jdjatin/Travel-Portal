import { Test, TestingModule } from '@nestjs/testing';
import { FlightAnalyticsController } from './flight-analytics.controller';

describe('FlightAnalyticsController', () => {
  let controller: FlightAnalyticsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FlightAnalyticsController],
    }).compile();

    controller = module.get<FlightAnalyticsController>(FlightAnalyticsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
