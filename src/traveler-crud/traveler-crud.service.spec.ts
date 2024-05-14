import { Test, TestingModule } from '@nestjs/testing';
import { TravelerCrudService } from './traveler-crud.service';

describe('TravelerCrudService', () => {
  let service: TravelerCrudService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TravelerCrudService],
    }).compile();

    service = module.get<TravelerCrudService>(TravelerCrudService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
