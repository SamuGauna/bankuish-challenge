import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { ProcessCoursesDto } from './dto/process-courses.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
  }

  @Post('process')
  async processCourses(@Body() ProcessCoursesDto: ProcessCoursesDto) {
    return await this.coursesService.processCourses(ProcessCoursesDto);
  }

  // @Get()
  // findAll() {
  //   return this.coursesService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.coursesService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
  //   return this.coursesService.update(+id, updateCourseDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.coursesService.remove(+id);
  // }
}
