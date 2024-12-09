import {
  HttpException,
  HttpStatus,
  Injectable,
  UseGuards,
} from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { In, Repository } from 'typeorm';
import { CourseItem, ProcessCoursesDto } from './dto/process-courses.dto';
import { AuthGuard } from '../auth/auth.guard';
import { CourseOrderResponseDto } from './dto/courseOrderResponse.dto';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  async findAll(): Promise<any> {
    return await this.courseRepository.find();
  }

  @UseGuards(AuthGuard)
  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    const { name, prerequisiteName } = createCourseDto;

    // Validar que no exista un curso con el mismo nombre
    const existingCourse = await this.courseRepository.findOne({
      where: { name },
    });
    if (existingCourse) {
      throw new HttpException(
        'A course with this name already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    let prerequisite: Course = null;
    if (prerequisiteName) {
      // Verificar que el curso prerrequisito exista por nombre
      prerequisite = await this.courseRepository.findOne({
        where: { name: prerequisiteName },
      });
      if (!prerequisite) {
        throw new HttpException(
          'Prerequisite course does not exist',
          HttpStatus.CONFLICT,
        );
      }

      // Validar que no se cree un ciclo en los prerrequisitos
      await this.validateNoCycle(prerequisite, name);
    }

    const course = this.courseRepository.create({ name, prerequisite });
    return this.courseRepository.save(course);
  }

  async validateNoCycle(prerequisite: Course, currentCourseName: string) {
    let current = prerequisite;

    while (current) {
      if (current.name === currentCourseName) {
        throw new HttpException(
          'Cyclic dependency detected in prerequisites',
          HttpStatus.CONFLICT,
        );
      }

      if (current.prerequisite && typeof current.prerequisite === 'string') {
        current = await this.courseRepository.findOne({
          where: { name: current.prerequisite },
        });
      } else {
        break;
      }
    }
  }

  async validateCoursesExist(courses: CourseItem[]): Promise<void> {
    const courseNames = new Set<string>();

    courses.forEach(({ desiredCourse, requiredCourse }) => {
      courseNames.add(desiredCourse);
      if (requiredCourse) {
        courseNames.add(requiredCourse);
      }
    });

    const dbCourses = await this.courseRepository.find({
      where: { name: In(Array.from(courseNames)) },
    });

    const dbCourseNames = new Set(dbCourses.map((course) => course.name));

    const invalidCourses = Array.from(courseNames).filter(
      (courseName) => !dbCourseNames.has(courseName),
    );

    if (invalidCourses.length > 0) {
      throw new HttpException(
        `Invalid courses: ${invalidCourses.join(', ')}`,
        HttpStatus.CONFLICT,
      );
    }
  }

  async processCourses({
    courses,
  }: ProcessCoursesDto): Promise<CourseOrderResponseDto[]> {
    // Validar que los cursos existen en la base de datos
    //await this.validateCoursesExist(courses);

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
      throw new HttpException(
        'Cyclic dependency detected in prerequisites',
        HttpStatus.BAD_REQUEST,
      );
    }

    // Convertir el orden a un arreglo de objetos con índice
    const formattedOrder = order.map((course, index) => ({
      course,
      order: index,
    }));

    return formattedOrder;
  }
}
