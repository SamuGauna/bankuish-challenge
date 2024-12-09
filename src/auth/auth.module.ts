import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { AuthController } from './auth.controller';
import { FirebaseModule } from '../firebase/firebase.module';

@Module({
  imports: [forwardRef(() => FirebaseModule)],
  providers: [AuthService, AuthGuard],
  controllers: [AuthController],
  exports: [AuthGuard],
})
export class AuthModule {}
