import { Test, TestingModule } from '@nestjs/testing';
import { FlightAnalyticsService } from './flight-analytics.service';

describe('FlightAnalyticsService', () => {
  let service: FlightAnalyticsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FlightAnalyticsService],
    }).compile();

    service = module.get<FlightAnalyticsService>(FlightAnalyticsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
