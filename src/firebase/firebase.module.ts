import { Module } from '@nestjs/common';
import { FirebaseService } from './firebase.service';
import { FirebaseClientService } from './firebase-client/firebase-client.service';

@Module({
  imports: [],
  providers: [FirebaseService, FirebaseClientService],
  exports: [FirebaseService, FirebaseClientService],
})
export class FirebaseModule {}
