import { Test, TestingModule } from '@nestjs/testing';
import { FlightDataService } from './flight-data.service';

describe('FlightDataService', () => {
  let service: FlightDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FlightDataService],
    }).compile();

    service = module.get<FlightDataService>(FlightDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
