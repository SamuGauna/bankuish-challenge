import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/auth.guard';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const mockAuthGuard = {
      canActivate: jest.fn(() => true), // Burlar el guard para permitir acceso
    };

    const mockUsersService = {
      assignCourse: jest.fn(),
      getAssignedCourses: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: mockUsersService }],
    })
      .overrideGuard(AuthGuard)
      .useValue(mockAuthGuard)
      .compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call assignCourse in the service', async () => {
    const userId = 'test-user-id';
    const courseId = 'test-course-id';

    await controller.assignCourse(userId, courseId);

    expect(service.assignCourse).toHaveBeenCalledTimes(1);
    expect(service.assignCourse).toHaveBeenCalledWith(userId, courseId);
  });

  it('should call getAssignedCourses in the service', async () => {
    const userId = 'test-user-id';

    await controller.getUserCourses(userId);

    expect(service.getAssignedCourses).toHaveBeenCalledTimes(1);
    expect(service.getAssignedCourses).toHaveBeenCalledWith(userId);
  });
});
