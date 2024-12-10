import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly firebaseService: FirebaseService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers['authorization'];

    if (!authorization) {
      throw new HttpException(
        'No authorization header found',
        HttpStatus.PRECONDITION_FAILED,
      );
    }

    const [bearer, token] = authorization.split(' ');

    if (bearer !== 'Bearer' || !token) {
      throw new HttpException(
        'Invalid authorization format',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const decodedToken = await this.firebaseService.verifyIdToken(token);
      request.user = {
        id: decodedToken.uid,
        email: decodedToken.email,
      };
      return true;
    } catch (error) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }
}
