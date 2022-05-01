import { Test, TestingModule } from '@nestjs/testing';
import { KnowledgeController } from './knowledge.controller';

describe('KnowledgeController', () => {
  let controller: KnowledgeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KnowledgeController],
    }).compile();

    controller = module.get<KnowledgeController>(KnowledgeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
