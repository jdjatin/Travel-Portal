import { Test, TestingModule } from '@nestjs/testing';
import { AdminUserCrudController } from './admin-user-crud.controller';
import { AdminUserCrudService } from './admin-user-crud.service';

describe('AdminUserCrudController', () => {
  let controller: AdminUserCrudController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminUserCrudController],
      providers: [AdminUserCrudService],
    }).compile();

    controller = module.get<AdminUserCrudController>(AdminUserCrudController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
