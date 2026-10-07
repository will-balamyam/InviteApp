import { Test, TestingModule } from '@nestjs/testing';
import { FamilyAccessController } from './family-access.controller';

describe('FamilyAccessController', () => {
  let controller: FamilyAccessController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FamilyAccessController],
    }).compile();

    controller = module.get<FamilyAccessController>(FamilyAccessController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
