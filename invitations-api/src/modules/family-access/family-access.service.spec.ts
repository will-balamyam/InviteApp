import { Test, TestingModule } from '@nestjs/testing';
import { FamilyAccessService } from './family-access.service';

describe('FamilyAccessService', () => {
  let service: FamilyAccessService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FamilyAccessService],
    }).compile();

    service = module.get<FamilyAccessService>(FamilyAccessService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
