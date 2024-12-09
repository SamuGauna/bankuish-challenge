import {
  Controller,
  Get,
  Post,
  Param,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/auth.guard';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { apiResponseWrapper } from '../utils/factories/apiResponseWrapper.factory';
import { apiErrorWrapper } from '../utils/factories/apiErrorWrapper.factory';
import { ErrorResponseDto } from '../utils/dto/error.dto';
import { UserCourse } from './entities/user-course.entity';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Asign course to user' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: apiResponseWrapper(UserCourse),
    description: 'Asign course ok',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: apiErrorWrapper(ErrorResponseDto),
    description: 'User already has an active course',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: apiErrorWrapper(ErrorResponseDto),
    description: 'User or course not found',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    type: apiErrorWrapper(ErrorResponseDto),
    description: 'Internal server error',
  })
  @Post(':userId/courses/:courseId')
  async assignCourse(
    @Param('userId') userId: string,
    @Param('courseId') courseId: string,
  ) {
    return this.usersService.assignCourse(userId, courseId);
  }

  @ApiOperation({ summary: 'Get a user course or courses' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: apiResponseWrapper(UserCourse),
    description: 'Ok',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: apiErrorWrapper(ErrorResponseDto),
    description: 'User not found',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    type: apiErrorWrapper(ErrorResponseDto),
    description: 'Internal server error',
  })
  @Get(':userId/courses')
  async getUserCourses(@Param('userId') userId: string) {
    return this.usersService.getAssignedCourses(userId);
  }
}
