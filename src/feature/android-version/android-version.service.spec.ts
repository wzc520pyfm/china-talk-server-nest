import { Test, TestingModule } from '@nestjs/testing';
import { AndroidVersionService } from './android-version.service';

describe('AndroidVersionService', () => {
  let service: AndroidVersionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AndroidVersionService],
    }).compile();

    service = module.get<AndroidVersionService>(AndroidVersionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
