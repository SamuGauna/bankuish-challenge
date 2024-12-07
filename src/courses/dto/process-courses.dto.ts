import { Type } from 'class-transformer';
import { IsArray, IsString, ValidateNested } from 'class-validator';

class CourseItem {
  @IsString()
  desiredCourse: string;

  @IsString()
  requiredCourse: string;
}

export class ProcessCoursesDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CourseItem)
  courses: CourseItem[];
}
