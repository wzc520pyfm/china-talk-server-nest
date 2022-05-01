import { Test, TestingModule } from '@nestjs/testing';
import { PaperController } from './paper.controller';

describe('PaperController', () => {
  let controller: PaperController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaperController],
    }).compile();

    controller = module.get<PaperController>(PaperController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
