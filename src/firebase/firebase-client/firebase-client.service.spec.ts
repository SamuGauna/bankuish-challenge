import { Test, TestingModule } from '@nestjs/testing';
import { FirebaseClientService } from './firebase-client.service';
import { ConfigService } from '@nestjs/config';
import { AuthLoginDto } from 'src/auth/dto/auth-login.dto';

jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(() => ({})),
}));

jest.mock('firebase/auth', () => {
  return {
    getAuth: jest.fn(() => ({})),
    signInWithEmailAndPassword: jest.fn(() =>
      Promise.resolve({
        user: {
          getIdToken: jest.fn(() => Promise.resolve('fake-token')),
        },
      }),
    ),
  };
});

const mockConfigService = {
  get: jest.fn((key: string) => {
    const config = {
      FIREBASE_API_KEY: 'fake-api-key',
      FIREBASE_AUTH_DOMAIN: 'fake-auth-domain',
      FIREBASE_PROJECT_ID: 'fake-project-id',
    };
    return config[key];
  }),
};

describe('FirebaseClientService', () => {
  let service: FirebaseClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FirebaseClientService,
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    service = module.get<FirebaseClientService>(FirebaseClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should login successfully', async () => {
    const loginDto: AuthLoginDto = {
      email: 'test@email.com',
      password: 'password123',
    };

    const token = await service.login(loginDto);
    expect(token).toBe('fake-token');
  });
});
