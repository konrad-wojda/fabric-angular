import { Test, TestingModule } from '@nestjs/testing';
import { DrawingsController } from './drawings.controller';

describe('DrawingsController', () => {
  let controller: DrawingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DrawingsController],
    }).compile();

    controller = module.get<DrawingsController>(DrawingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
