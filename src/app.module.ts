import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppImports } from './app.imports';
import { CoursesModule } from './courses/courses.module';
import { FirebaseClientModule } from './auth/firebase/firebase-client/firebase-client.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [...AppImports, CoursesModule, AuthModule, FirebaseClientModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
