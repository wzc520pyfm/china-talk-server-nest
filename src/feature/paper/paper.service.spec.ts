import { Test, TestingModule } from '@nestjs/testing';
import { PaperService } from './paper.service';

describe('PaperService', () => {
  let service: PaperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaperService],
    }).compile();

    service = module.get<PaperService>(PaperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
