import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { Course } from '../courses/entities/course.entity';
import { UserCourse } from './entities/user-course.entity';

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: Repository<User>;
  let courseRepository: Repository<Course>;
  let userCourseRepository: Repository<UserCourse>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Course),
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(UserCourse),
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    courseRepository = module.get<Repository<Course>>(
      getRepositoryToken(Course),
    );
    userCourseRepository = module.get<Repository<UserCourse>>(
      getRepositoryToken(UserCourse),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call userRepository.save when assigning a course', async () => {
    jest
      .spyOn(userRepository, 'findOne')
      .mockResolvedValueOnce({ id: 'user-id' } as User);
    jest
      .spyOn(courseRepository, 'findOne')
      .mockResolvedValueOnce({ id: 'course-id' } as Course);

    jest.spyOn(userCourseRepository, 'findOne').mockResolvedValueOnce(null);
    jest.spyOn(userCourseRepository, 'create').mockReturnValue({
      user: { id: 'user-id' } as User,
      course: { id: 'course-id' } as Course,
      isActive: true,
    } as UserCourse);
    jest
      .spyOn(userCourseRepository, 'save')
      .mockResolvedValueOnce({ id: 'user-course-id' } as UserCourse);

    await service.assignCourse('user-id', 'course-id');

    expect(userCourseRepository.create).toHaveBeenCalledWith({
      user: { id: 'user-id' },
      course: { id: 'course-id' },
      isActive: true,
    });
    expect(userCourseRepository.save).toHaveBeenCalledWith(
      expect.objectContaining({
        user: { id: 'user-id' },
        course: { id: 'course-id' },
        isActive: true,
      }),
    );
  });

  it('should retrieve assigned courses for a user', async () => {
    const mockCourses = [
      { id: 'course-1', name: 'Curso A' } as Course,
      { id: 'course-2', name: 'Curso B' } as Course,
    ];

    const mockUser = {
      id: 'user-id',
      name: 'Test User',
      email: 'test@example.com',
      courses: mockCourses,
    } as unknown as User;

    jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(mockUser);

    const result = await service.getAssignedCourses('user-id');

    expect(result).toEqual(mockUser);
    expect(userRepository.findOne).toHaveBeenCalledWith({
      where: { id: 'user-id' },
      relations: ['courses'],
    });
  });
});
