import { forwardRef, Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { AuthModule } from '../auth/auth.module';
import { FirebaseModule } from '../firebase/firebase.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Course]),
    forwardRef(() => AuthModule),
    forwardRef(() => FirebaseModule),
  ],
  controllers: [CoursesController],
  providers: [CoursesService],
  exports: [TypeOrmModule],
})
export class CoursesModule {}
