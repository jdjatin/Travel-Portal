import { Test, TestingModule } from '@nestjs/testing';
import { TravelerCrudController } from './traveler-crud.controller';
import { TravelerCrudService } from './traveler-crud.service';

describe('TravelerCrudController', () => {
  let controller: TravelerCrudController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TravelerCrudController],
      providers: [TravelerCrudService],
    }).compile();

    controller = module.get<TravelerCrudController>(TravelerCrudController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
