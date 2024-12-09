import { Test, TestingModule } from '@nestjs/testing';
import { FirebaseClientService } from './firebase-client.service';

describe('FirebaseClientService', () => {
  let service: FirebaseClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FirebaseClientService],
    }).compile();

    service = module.get<FirebaseClientService>(FirebaseClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
