import { BadRequestException, Injectable, UseGuards } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { Repository } from 'typeorm';
import { ProcessCoursesDto } from './dto/process-courses.dto';
import { AuthGuard } from '../auth/auth.guard';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  @UseGuards(AuthGuard)
  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    const course = this.courseRepository.create(createCourseDto);
    return this.courseRepository.save(course);
  }

  async processCourses({
    courses,
  }: ProcessCoursesDto): Promise<{ courseOrder: string[] }> {
    const graph = new Map<string, string[]>();
    const inDegree = new Map<string, number>();

    // Construir el grafo y el conteo de grados de entrada
    courses.forEach(({ desiredCourse, requiredCourse }) => {
      if (!graph.has(requiredCourse)) graph.set(requiredCourse, []);
      if (!graph.has(desiredCourse)) graph.set(desiredCourse, []);

      graph.get(requiredCourse).push(desiredCourse);

      inDegree.set(desiredCourse, (inDegree.get(desiredCourse) || 0) + 1);
      if (!inDegree.has(requiredCourse)) inDegree.set(requiredCourse, 0);
    });

    // Ordenamiento topológico (Kahn's Algorithm)
    const queue = [...inDegree.keys()].filter((key) => inDegree.get(key) === 0);
    const order = [];

    while (queue.length > 0) {
      const course = queue.shift();
      order.push(course);

      for (const dependent of graph.get(course) || []) {
        inDegree.set(dependent, inDegree.get(dependent) - 1);
        if (inDegree.get(dependent) === 0) {
          queue.push(dependent);
        }
      }
    }

    if (order.length !== graph.size) {
      throw new BadRequestException('Ciclo detectado en los prerrequisitos');
    }

    return { courseOrder: order };
  }
}
