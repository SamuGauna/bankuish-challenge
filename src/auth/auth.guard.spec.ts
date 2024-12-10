import { AuthGuard } from './auth.guard';
import { FirebaseService } from '../firebase/firebase.service';

describe('AuthGuard', () => {
  it('should be defined', () => {
    const mockFirebaseService = {
      validateToken: jest.fn(),
    };
    const guard = new AuthGuard(
      mockFirebaseService as unknown as FirebaseService,
    );

    expect(guard).toBeDefined();
  });
});
