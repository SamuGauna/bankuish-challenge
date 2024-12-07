import { Body, Controller, Post } from '@nestjs/common';
import { FirebaseClientService } from './firebase/firebase-client/firebase-client.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly firebaseClientService: FirebaseClientService) {}

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return {
      token: await this.firebaseClientService.login(email, password),
    };
  }
}
