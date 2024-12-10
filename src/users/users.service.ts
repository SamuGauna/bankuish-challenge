import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserCourse } from './entities/user-course.entity';
import { Course } from '../courses/entities/course.entity';
import { CreateUserDto } from './dto/create-user.dto';

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

  async createUser(createUserDto: CreateUserDto) {
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }
    const user = this.userRepository.create({
      email: createUserDto.email,
    });
    await this.userRepository.save(user);

    return user;
  }

  async assignCourse(userId: string, courseId: string): Promise<UserCourse> {
    const hasActiveCourse = await this.validateUserCourseRestrictions(userId);

    if (hasActiveCourse) {
      throw new HttpException(
        'User already has an active course',
        HttpStatus.BAD_REQUEST,
      );
    }
    const [user, course] = await Promise.all([
      this.userRepository.findOne({ where: { id: userId } }),
      this.courseRepository.findOne({ where: { id: courseId } }),
    ]);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (!course) {
      throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
    }
    const userCourse = this.userCourseRepository.create({
      user,
      course,
      isActive: true,
    });

    return this.userCourseRepository.save(userCourse);
  }

  async getAssignedCourses(userId: string): Promise<User> {
    const userWithCourses = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['courses'],
    });
    if (!userWithCourses) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return userWithCourses;
  }

  async validateUserCourseRestrictions(userId: string): Promise<boolean> {
    const activeCourse = await this.userCourseRepository.findOne({
      where: { user: { id: userId }, isActive: true },
    });

    return !!activeCourse;
  }
}
