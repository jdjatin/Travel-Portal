import { Test, TestingModule } from '@nestjs/testing';
import { AdminUserCrudService } from './admin-user-crud.service';

describe('AdminUserCrudService', () => {
  let service: AdminUserCrudService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminUserCrudService],
    }).compile();

    service = module.get<AdminUserCrudService>(AdminUserCrudService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
