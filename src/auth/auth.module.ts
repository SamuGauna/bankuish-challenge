import { Module } from '@nestjs/common';
import { FirebaseService } from './firebase/firebase.service';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { AuthController } from './auth.controller';
import { FirebaseClientModule } from './firebase/firebase-client/firebase-client.module';

@Module({
  imports: [FirebaseClientModule],
  providers: [FirebaseService, AuthService, AuthGuard],
  exports: [AuthGuard],
  controllers: [AuthController],
})
export class AuthModule {}
