import { Test, TestingModule } from '@nestjs/testing';
import { FirebaseService } from './firebase.service';
import { ConfigService } from '@nestjs/config';

const mockConfigService = {
  get: jest.fn((key: string) => {
    const config = {
      FIREBASE_API_KEY: 'test-api-key',
      FIREBASE_AUTH_DOMAIN: 'test-auth-domain',
      FIREBASE_PROJECT_ID: 'test-project-id',
      FIREBASE_PRIVATE_KEY:
        '-----BEGIN PRIVATE KEY-----\nMOCK_PRIVATE_KEY\n-----END PRIVATE KEY-----',
      FIREBASE_CLIENT_EMAIL:
        'mock-client-email@test-project-id.iam.gserviceaccount.com',
    };
    return config[key];
  }),
};

jest.mock('firebase-admin', () => {
  return {
    apps: [],
    credential: {
      cert: jest.fn(),
    },
    initializeApp: jest.fn(),
  };
});

describe('FirebaseService', () => {
  let service: FirebaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FirebaseService,
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    service = module.get<FirebaseService>(FirebaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
