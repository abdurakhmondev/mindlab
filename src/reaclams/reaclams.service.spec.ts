import { Test, TestingModule } from '@nestjs/testing';
import { ReaclamsService } from './reaclams.service';

describe('ReaclamsService', () => {
  let service: ReaclamsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReaclamsService],
    }).compile();

    service = module.get<ReaclamsService>(ReaclamsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
