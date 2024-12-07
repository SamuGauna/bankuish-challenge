import { Injectable } from '@nestjs/common';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { FirebaseService } from './firebase/firebase.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly firebaseService: FirebaseService) {}

  // Protege los endpoints y verifica el token
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers['authorization'];

    if (!authorization) {
      throw new Error('No authorization header found');
    }

    const [bearer, token] = authorization.split(' ');

    if (bearer !== 'Bearer' || !token) {
      throw new Error('Invalid authorization format');
    }

    try {
      // Verificamos el token
      await this.firebaseService.verifyIdToken(token);
      return true;
    } catch (error) {
      throw new Error('Unauthorized');
    }
  }
}
