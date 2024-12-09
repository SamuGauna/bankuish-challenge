import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserCourse } from './entities/user-course.entity';
import { Course } from '../courses/entities/course.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserCourse)
    private readonly userCourseRepository: Repository<UserCourse>,
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}
  async assignCourse(userId: string, courseId: string): Promise<UserCourse> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const course = await this.courseRepository.findOne({
      where: { id: courseId },
    });
    if (!course) {
      throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
    }

    const activeCourse = await this.userCourseRepository.findOne({
      where: { user: { id: userId }, isActive: true },
    });
    if (activeCourse) {
      throw new HttpException(
        'User already has an active course',
        HttpStatus.BAD_REQUEST,
      );
    }

    const userCourse = this.userCourseRepository.create({
      user,
      course,
      isActive: true,
    });
    return this.userCourseRepository.save(userCourse);
  }

  async getAssignedCourses(userId: string): Promise<UserCourse[]> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['courses', 'courses.course'],
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return user.courses;
  }
}
