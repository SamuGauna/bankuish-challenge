import {
  Controller,
  Post,
  Body,
  UseGuards,
  HttpStatus,
  Get,
  Param,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { ProcessCoursesDto } from './dto/process-courses.dto';
import { AuthGuard } from '../auth/auth.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { apiResponseWrapper } from '../utils/factories/apiResponseWrapper.factory';
import { apiErrorWrapper } from '../utils/factories/apiErrorWrapper.factory';
import { ErrorResponseDto } from '../utils/dto/error.dto';
import { GetCoursesDto } from './dto/get-courses.dto';
import { GetCourseDetailDto } from './dto/get-course-detail.dto';

@ApiTags('Courses')
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @ApiOperation({ summary: 'Create a course' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: apiResponseWrapper(CreateCourseDto),
    description: 'Course create success',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: apiErrorWrapper(ErrorResponseDto),
    description: 'Bad request',
  })
  @ApiResponse({
    status: HttpStatus.NOT_ACCEPTABLE,
    type: apiErrorWrapper(ErrorResponseDto),
    description: 'Not acceptable token',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    type: apiErrorWrapper(ErrorResponseDto),
    description: 'Internal server error',
  })
  @Post()
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
  }

  @ApiOperation({ summary: 'Process courses' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: apiResponseWrapper(ProcessCoursesDto),
    description: 'Process success',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: apiErrorWrapper(ErrorResponseDto),
    description: 'Cyclic dependency detected in prerequisites',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    type: apiErrorWrapper(ErrorResponseDto),
    description: 'Invalid input',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    type: apiErrorWrapper(ErrorResponseDto),
    description: 'Internal server error',
  })
  @UseGuards(AuthGuard)
  @Post('process')
  async processCourses(@Body() ProcessCoursesDto: ProcessCoursesDto) {
    return await this.coursesService.processCourses(ProcessCoursesDto);
  }

  @ApiOperation({ summary: 'List all courses' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: [GetCoursesDto],
    description: 'Returns a list of all courses',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    type: ErrorResponseDto,
    description: 'Internal server error',
  })
  @Get()
  async getAllCourses(): Promise<GetCoursesDto[]> {
    return this.coursesService.getAllCourses();
  }

  @ApiOperation({ summary: 'Get a course by its ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: GetCourseDetailDto,
    description: 'Course details fetched successfully',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: ErrorResponseDto,
    description: 'Course not found',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    type: ErrorResponseDto,
    description: 'Internal server error',
  })
  @Get(':id')
  async getCourseById(@Param('id') id: string): Promise<GetCourseDetailDto> {
    return this.coursesService.getCourseById(id);
  }
}
