import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

@Injectable()
export class FirebaseClientService {
  private app;
  private auth;

  constructor(private readonly configService: ConfigService) {
    this.app = initializeApp({
      apiKey: this.configService.get<string>('FIREBASE_API_KEY'),
      authDomain: this.configService.get<string>('FIREBASE_AUTH_DOMAIN'),
      projectId: this.configService.get<string>('FIREBASE_PROJECT_ID'),
    });

    this.auth = getAuth(this.app);
  }

  async login(email: string, password: string): Promise<string> {
    const userCredential = await signInWithEmailAndPassword(
      this.auth,
      email,
      password,
    );
    const token = await userCredential.user.getIdToken();
    return token;
  }
}
