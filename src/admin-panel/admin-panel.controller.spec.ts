import { Test, TestingModule } from '@nestjs/testing';
import { AdminPanelController } from './admin-panel.controller';

describe('AdminPanelController', () => {
  let controller: AdminPanelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminPanelController],
    }).compile();

    controller = module.get<AdminPanelController>(AdminPanelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
