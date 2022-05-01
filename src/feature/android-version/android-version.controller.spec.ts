import { Test, TestingModule } from '@nestjs/testing';
import { AndroidVersionController } from './android-version.controller';

describe('AndroidVersionController', () => {
  let controller: AndroidVersionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AndroidVersionController],
    }).compile();

    controller = module.get<AndroidVersionController>(AndroidVersionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
