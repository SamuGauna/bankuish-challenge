import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { FirebaseClientService } from '../firebase/firebase-client/firebase-client.service';

const mockFirebaseClientService = {
  authenticate: jest.fn(),
  verifyToken: jest.fn(),
};

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: FirebaseClientService,
          useValue: mockFirebaseClientService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
