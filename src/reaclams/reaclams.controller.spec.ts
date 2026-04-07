import { Test, TestingModule } from '@nestjs/testing';
import { ReaclamsController } from './reaclams.controller';

describe('ReaclamsController', () => {
  let controller: ReaclamsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReaclamsController],
    }).compile();

    controller = module.get<ReaclamsController>(ReaclamsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
